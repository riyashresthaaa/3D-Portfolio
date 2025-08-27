import React, {useRef, useState, Suspense} from 'react'
import emailjs from '@emailjs/browser';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import {Canvas} from '@react-three/fiber'
import { a } from '@react-spring/three';

import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';


const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name:'', email: '', message: ''})
  const [isLoading, setIsLoading] = useState(false);
  const[currentAnimation, setCurrentAnimation] = useState('idle');

  const {alert, showAlert, hideAlert} = useAlert();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };
  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs.send (
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Riya',
        from_email: form.email,
        to_email: 'ryeashrestha04@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: 'Message sent successfully!', type: 'success' });

      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle');
        setForm({name:'', email: '', message: ''});
      }, [3000]);

      setForm({name:'', email: '', message: ''});
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      console.log(error);
      showAlert({ show: true, text: 'Didnot recieve message!', type: 'Danger' });

    })
  }

  return (
    <section className="relative flex flex-col lg:flex-row max-container items-center justify-between h-[100vh] ">
      {alert.show && <Alert {...alert} />}
      {/* Form Section */}
      <div className="flex-1 w-full max-w-4xl flex flex-col justify-center z-10">
        <div className="flex items-center mb-6">
          <h1 className="head-text whitespace-nowrap mr-4">Get in Touch</h1>
        </div>
        <form
          className="w-full flex flex-col gap-7"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold w-full">
            Name
            <input
              type="text"
              name="name"
              placeholder="John"
              className="input w-full min-w-0"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold w-full">
            Email
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              className="input w-full min-w-0"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold w-full">
            Your Message
            <textarea
              name="message"
              rows="4"
              className="textarea w-full min-w-0"
              placeholder="Let me know how I can help you!"
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn w-full"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      {/* Fox 3D Model Section */}
      <div className="flex-1 w-full max-w-xl flex items-center justify-center lg:justify-end mt-10 lg:mt-0 lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [2.5, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
               position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[1, 1, 1]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact