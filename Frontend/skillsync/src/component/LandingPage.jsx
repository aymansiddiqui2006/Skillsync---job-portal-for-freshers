import background from '../component/images/background.png'
import aboutsecMale from '../component/images/aboutSecMale.png'
import aboutsecFemale from '../component/images/aboutSecFemale.png'
import logo from '../component/images/logo.png'
import { NavLink} from 'react-router-dom'
import { Link } from 'react-scroll'

function LandingPage() {
    return (
        <>
            <nav className='bg-[#00296d] flex  items-center w-full h-20 px-12 py-4 justify-between font-serif fixed z-50'>

                <NavLink to='/'><div className='flex items-center gap-3'>
                    <img src={logo} alt="not found" className="w-16 h-auto" />
                    <div className='font-bold text-white text-3xl font-serif'>SKILLSYNC</div>
                </div></NavLink>
                <div className=''><ul className='flex items-center gap-8 font-bold text-[1.3rem] text-white px-3 '>
                    <li><Link to='home' smooth={true} duration={500} className='cursor-pointer active:text-amber-500' activeClass="text-amber-500" >Home</Link></li>
                    <li><Link to='about' smooth={true} duration={500} className='cursor-pointer active:text-amber-500'>About</Link></li>
                    <li><Link to='features' smooth={true} duration={500} className='cursor-pointer active:text-amber-500'>Features</Link></li>
                    <li><Link to='contact' smooth={true} duration={500} className='cursor-pointer active:text-amber-500'>Contact</Link></li>
                    <li><Link to='about' smooth={true} duration={500} className='cursor-pointer active:text-amber-500'>Explore</Link></li>

                    <li><NavLink to='/login' className={({ isActive }) => isActive ? "bg-amber-500 text-black px-4 py-1 rounded-xl"
                        : "bg-white text-black px-2 py-1 rounded-md text-[1.1rem] hover:bg-amber-400"}>Login</NavLink></li>
                    <li><NavLink to='/signin' className={({ isActive }) => isActive ? "bg-amber-500 text-black px-4 py-1 rounded-xl"
                        : "bg-white text-black px-2 py-1 rounded-md text-[1.1rem] hover:bg-amber-400"}>Sign Up</NavLink></li>
                </ul>
                </div>


            </nav>

            <main>
                <section id="home"
                    className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
                    style={{
                        backgroundImage: `url(${background})`, backgroundColor: "rgba(5, 0, 43, 0.714)",
                        backgroundBlendMode: "overlay"
                    }}
                >


                    <h1 className="text-6xl font-extrabold text-white uppercase tracking-[2px] text-center font-serif leading-20">
                        The Right Job Deserves the Right You!
                    </h1>

                    <p className="text-[1.3rem]  text-gray-200 text-center mt-5 leading-9 max-w-3xl mx-auto font-serif">
                        Discover opportunities that match your skills and ambitions. Join
                        SkillSync to connect with the right employers and build your career
                        effortlessly.
                    </p>

                    <a
                        href="/jobcard"
                        className="mt-8 bg-red-600/80  hover:bg-red-800/80 font-serif text-white font-bold px-8 py-3 rounded-lg transition hover:scale-105"
                    >
                        Explore
                    </a>
                </section>

                <section id="about"
                    className="bg-blue-200/55 w-full p-28 font-serif">
                    <h1 className="text-4xl font-medium flex justify-center mb-10">
                        About SkillSync
                    </h1>
                    <div className="flex flex-wrap gap-10 justify-center items-start">
                        {/* Text Section */}
                        <div className="flex flex-col gap-8 max-w-lg text-left text-[1.2rem]">
                            <p className="text-gray-800 leading-relaxed">
                                SkillSync is a platform designed to bridge the gap between talent and opportunity. Our mission
                                is to help you find the right job that matches your skills and ambitions.
                            </p>
                            <p className="text-gray-800 leading-relaxed">
                                Whether you are a fresh graduate or an experienced professional, SkillSync connects you with
                                employers who value your skills and expertise. We simplify your job search and make career
                                growth effortless.
                            </p>
                            <p className="text-gray-800 leading-relaxed">
                                Join SkillSync today and discover opportunities that align with your strengths, all in one
                                place.
                            </p>
                        </div>

                        {/* Images Section */}
                        <div className="flex flex-col gap-6">
                            <img
                                src={aboutsecMale}
                                alt="Job Description"
                                className="rounded-lg w-[350px] h-[250px] transform hover:scale-105 transition duration-500"
                            />
                            <img
                                src={aboutsecFemale}
                                alt="Job Interview"
                                className="rounded-lg w-[350px] h-[250px] transform hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>
                </section>

                <section id="features"
                    className="bg-blue-100/40 py-20 px-6 font-serif">
                    <h2 className="text-4xl text-center font-bold text-[#05002b] mb-12">Why Choose SkillSync?</h2>
                    <div className=' flex flex-col items-center p-0.5'>
                        {/* Feature 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
                            <div className="md:flex-1 text-left">
                                <h3 className="text-2xl font-semibold text-[#05002b] mb-4">Smart Job Matching</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    No more endless searching—SkillSync’s AI connects you with jobs that truly match your skills and career ambitions.
                                </p>
                            </div>
                            <div className="md:flex-1">
                                <img
                                    src="https://equitablegrowth.org/wp-content/uploads/2018/11/Job-searching-and-job-matching.jpg"
                                    alt="Job Matching"
                                    className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Feature 2 (reverse) */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-16">
                            <div className="md:flex-1 text-left">
                                <h3 className="text-2xl font-semibold text-[#05002b] mb-4">Personalized Skill Recommendations</h3>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Stay ahead with learning paths designed just for you. Upgrade yourself with in-demand skills to unlock more opportunities.
                                </p>
                            </div>
                            <div className="md:flex-1">
                                <img
                                    src="https://media.istockphoto.com/id/1399506394/vector/concept-of-up-skill-and-learning.jpg?s=612x612&w=0&k=20&c=_sN5jIE3OGQX-eFVcEk-Gwgne-Fy7CnfpCfHpfDvYug="
                                    alt="Skill Recommendations"
                                    className="w-full max-w-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact"
                    class="bg-[#05002b] text-white py-20 px-4 font-serif">
                    <div class="py-8 lg:py-16 mx-auto max-w-screen-md">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact Us</h2>
                        <p class="mb-8 lg:mb-16 font-light text-center text-gray-300 sm:text-xl">
                            Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
                        </p>
                        <form action="#" class="space-y-8 max-w-xl mx-auto">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Your email</label>
                                <input
                                    type="email"
                                    id="email"
                                    class="w-full p-3 rounded-md text-black bg-white border-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="name@skillsync.com"
                                    required
                                ></input>
                            </div>
                            <div>
                                <label for="subject" class="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    class="w-full p-3 rounded-md text-black bg-white border-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="Let us know how we can help you"
                                    required
                                ></input>
                            </div>
                            <div>
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-300">Your message</label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    class="w-full p-3 rounded-md text-black bg-white border-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="Leave a comment..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                class="bg-amber-400 text-black font-bold py-3 px-6 rounded-md hover:bg-amber-500 transition-colors"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </section></main>

            <footer className="bg-[#0b0b3b] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Top section: Logo + Links */}
                    <div className="md:flex md:justify-between md:items-start mb-8">
                        {/* Logo */}
                        <div className="mb-8 md:mb-0">
                            <a href="/" className="flex items-center gap-2">
                                <img src={logo} alt="SkillSync Logo" className="h-8" />
                                <span className="text-2xl font-bold">SkillSync</span>
                            </a>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm font-medium">
                            {/* Resources */}
                            <div>
                                <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Resources</h3>
                                <ul className="space-y-2">
                                    <li><a href="https://flowbite.com/" className="hover:underline text-white">Flowbite</a></li>
                                    <li><a href="https://tailwindcss.com/" className="hover:underline text-white">Tailwind CSS</a></li>
                                </ul>
                            </div>
                            {/* Follow Us */}
                            <div>
                                <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Follow us</h3>
                                <ul className="space-y-2">
                                    <li><a href="https://github.com/themesberg/flowbite" className="hover:underline text-white">Github</a></li>
                                    <li><a href="https://discord.gg/4eeurUVvTy" className="hover:underline text-white">Discord</a></li>
                                </ul>
                            </div>
                            {/* Legal */}
                            <div>
                                <h3 className="uppercase font-semibold mb-4 text-[#f9ba34]">Legal</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:underline text-white">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:underline text-white">Terms &amp; Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-700 mb-8" />

                    {/* Bottom section: copyright + social */}
                    <div className="sm:flex sm:justify-between sm:items-center">
                        <span className="text-sm text-gray-400 sm:text-center">
                            © 2026 <a href="/" className="hover:underline text-[#f9ba34]">SkillSync™</a>. All Rights Reserved.
                        </span>

                        <div className="flex mt-4 sm:mt-0 sm:justify-center space-x-5">
                            {/* Example social icons */}
                            <a href="#" className="text-gray-400 hover:text-[#f9ba34]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591a.6.6 0 0 1 .592-.591h.543Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#f9ba34]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord</span>
                            </a>
                            {/* Add more social icons similarly */}
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default LandingPage