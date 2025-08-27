import { projects } from '../constants';
import { Link } from 'react-router-dom';
import arrow from '../assets/icons/arrow.svg'; 
import CTA from '../components/CTA';

const Projects = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span>
      </h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Over the years, I’ve embarked on many projects; these are the highlights of my work.
        </p>
      </div>
      
      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex items-center justify-center'>
                <img 
                  src={project.iconUrl}
                  className='w-1/2 h-1/2 object-contain' 
                  alt={`${project.name} icon`} 
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='font-poppins font-semibold text-2xl'>{project.name}</h4>
              <p className='text-slate-500 mt-2'>{project.description}</p>
            </div>

            <div className="mt-5 flex items-center gap-2 font-poppins">
              <Link
                to={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600"
              >
                GitHub Link
              </Link>
              <img 
                src={arrow}
                alt="arrow"
                className='w-4 h-4 object-contain'
              />
            </div>
          </div>
        ))}
      </div>
      <hr  className='border-slate-200'/>
      <CTA />
    </section>
  )
}

export default Projects;
