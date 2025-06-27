import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree  } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import * as THREE from "three"
import gsap from 'gsap'

const Model = () => {
  const gltf = useGLTF('/model/bot.glb')
  const modelRef = useRef()
  const { mouse } = useThree()

  useEffect(()=>{
    if(modelRef.current){
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center =  new THREE.Vector3()
      box.getCenter(center)
      modelRef.current.position.sub(center)
    }
  }, [])

  useFrame(()=>{
    if(modelRef.current){
      const targetX = mouse.x * 0.3;
      const targetY = mouse.y * 0.3;

       // Smooth the motion using lerp
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetX,
        0.03
      )

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        -targetY,
        0.03
      )
    }
  })

  return (
    <primitive ref={modelRef} object={gltf.scene} />
  )

}

const App = () => {

    const leftRef = useRef()
    const rightRef = useRef()
    const navRef = useRef()
    const canvasRef = useRef()

    useEffect(() => {
  const timeout = setTimeout(() => {
    const tl = gsap.timeline()

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, 'a')
      .from(canvasRef.current, {
        y: 500,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, 'a')
      .from(rightRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay:1.2,
        ease: 'power2.out',
      }, 'a')
      .from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        delay:1,
        ease: 'power2.out',
      }, 'a')
  }, 100)

  return () => clearTimeout(timeout)
}, [])



  return (
    <>
    {/* Mobile Device */}

    <div className=' h-screen w-full lg:hidden flex flex-col gap-[2vh] justify-center items-center px-[2vw] bg-zinc-900'>
      <h1 className='text-center text-[2.1vh] text-white'>For a better user experience<br />and performance optimisation <br />This website is limited to <span className='text-red-400 font-light'>desktop view</span> only</h1>

      <h1 className='text-white text-[3vh] flex items-center space-x-2'>Made by
        <svg className='ml-[1vh]' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
          <circle cx={17} cy={7} r={1.5} fill="currentColor" fillOpacity={0}>
            <animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1">
            </animate>
          </circle>

          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path strokeDasharray={72} strokeDashoffset={72} d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0">
              </animate>
            </path>
            
            <path strokeDasharray={28} strokeDashoffset={28} d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0">
              </animate>
            </path>
          </g>
        </svg>
        
         <a className='mobileIGLink underline-offset-3 underline decoration-white' href="https://www.instagram.com/dev.with.sat/">dev.with.sat</a></h1>

    </div>

    {/* Main */}

    <div className=" hidden lg:block relative main h-screen w-full bg-[#CBCBCB] overflow-hidden">

      {/* Canvas */}

      <div ref={canvasRef} className='absolute h-screen w-full mt-[3vh] z-20'>
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 3]} intensity={1.5} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </div>

      {/* Nav */}

      <div ref={navRef} className='
      h-[6vh] w-full
      px-[2.5vw]
      flex
      justify-between
      '>

        {/* Left */}
        <div className='
        h-full w-[62.9vw] bg-[#EAEAEA]
        rounded-b-[14px]
        flex
        justify-center items-center
        '>
          
          <div className="left
          h-full w-[50%]
          flex items-center
          gap-[1vw]
          px-[1vw]
          ">
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="black"/>
            <path d="M17 6C21.715 6 25.7352 8.96729 27.2998 13.1357C26.5102 14.5331 25.5575 16.7525 23 17H28C28 21.7153 25.0322 25.7354 20.8633 27.2998C19.4659 26.5103 17.2474 25.557 17 23C20.3137 23 23 20.3137 23 17C23 13.6863 20.3137 11 17 11C13.6863 11 11 13.6863 11 17C11 20.3137 13.6863 23 17 23V28C12.2845 28 8.26354 25.0323 6.69922 20.8633C7.48875 19.4659 8.44274 17.2475 11 17H6C6 12.2849 8.96713 8.26377 13.1357 6.69922C14.5331 7.48883 16.7525 8.44229 17 11V6Z" fill="#EAEAEA"/>
            </svg>

            <h1>jovi</h1>

          </div>

          <div className="right
          h-full w-[50%]
          flex items-center justify-between
          gap-[1.5vw]
          px-[1.5vw]
          ">

            <div className="links
            flex
            gap-[1.5vw]
            ">
              <a href="">How it works</a>
              <a href="">Features</a>
              <a href="">For teams</a>
            </div>
            
            <div className="icon">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="6.47937" width="3" height="3" rx="1.5" fill="black"/>
              <rect x="6" y="15.4998" width="3" height="3" rx="1.5" transform="rotate(-90 6 15.4998)" fill="black"/>
              <rect x="6" y="6.47937" width="3" height="3" rx="1.5" fill="black"/>
              <rect x="12" y="6.47937" width="3" height="3" rx="1.5" fill="black"/>
              <rect x="6" y="3.49976" width="3" height="3" rx="1.5" transform="rotate(-90 6 3.49976)" fill="black"/>
              </svg>
            </div>

          </div>

        </div>

        {/* Right */}
        <div className='
        hidden
        lg:flex
        justify-between items-center
        px-[1vw]
        h-full w-[20.1vw] bg-[#E35111]
        rounded-b-[14px]
        '>

          <h1 className='text-white text-[1.2vw]'>Start of work</h1>

          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 19C0.5 19.4142 0.83579 19.75 1.25 19.75L19.25 19.75C19.6642 19.75 20 19.4142 20 19L20 0.999999C20 0.585799 19.6642 0.249999 19.25 0.249999L1.25 0.25C0.835789 0.25 0.499999 0.5858 0.499999 1L0.5 19ZM11.9089 9.2509L5.71967 9.2509L5.71967 10.7509L11.9089 10.7509L10.1891 12.4705L11.2498 13.5312L14.7804 10.0009L11.2498 6.4706L10.1891 7.5312L11.9089 9.2509Z" fill="white"/>
          </svg>


        </div>

      </div>

      {/* Left */}

      <div ref={leftRef} className="left
      absolute
      left-0
      bottom-0
      lg:h-[79.7vh] lg:w-[27vw]
      ">
        {/* Top */}
        <div className='
        lg:w-full lg:h-[15.7%]
        flex justify-end items-center
        '>
          <h1 className='text-[1.8vw] leading-[1.95vw] mr-[2vw]'>Your AI <br />support droid <br />is here</h1>
        </div>
        
        {/* Mid */}
        <div className='lg:w-full lg:h-[32.25%]
        flex justify-center items-center text-center
        '>
        <h1
          className="animated-text"
          style={{
            backgroundImage: "url('/images/text-mask.png')",
          }}
        >
          jovi
        </h1>       


        </div>

        {/* Bottom */}
        <div className='lg:w-full lg:h-[52.05%]
        flex flex-col
        justify-center items-center
        gap-[2vw]
        '>

          <h2 className='
          ml-[3vw]
          '>Scroll Down</h2>

          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.3884 29.3077L14.3884 0.692304C14.3884 0.351919 14.6634 0.0769193 15.0038 0.0769193C15.3442 0.0769193 15.6192 0.351919 15.6192 0.692304L15.6192 27.8211L19.3538 24.0865C19.5942 23.8462 19.9846 23.8462 20.225 24.0865C20.4654 24.3269 20.4654 24.7173 20.225 24.9577L15.4384 29.7442C15.2615 29.9211 14.9981 29.9731 14.7673 29.8769C14.5384 29.7808 14.3884 29.5558 14.3884 29.3077Z" fill="black"/>
          <path d="M9.59572 24.5154C9.59572 24.3577 9.65533 24.2 9.77649 24.0808C10.0169 23.8404 10.4073 23.8404 10.6476 24.0808L15.44 28.8731C15.6803 29.1134 15.6803 29.5038 15.44 29.7442C15.1996 29.9846 14.8092 29.9846 14.5688 29.7442L9.77649 24.9519C9.65533 24.8308 9.59572 24.6731 9.59572 24.5154Z" fill="black"/>
          </svg>

        </div>

      </div>

      {/* Right */}

      <div ref={rightRef} className="right
      absolute
      right-0
      bottom-0
      lg:h-[52.7vh] lg:w-[27vw]
      ">

            {/* Top */}
            <div className='
            lg:h-[47%] lg:w-full
            flex justify-start items-center
            '>
              <h1
                className="animated-text"
                  style={{
                   backgroundImage: "url('/images/text-mask.png')",
                  }}
                >bot
              </h1>
            </div>

            {/* Bottom */}

            <div className='lg:h-[53%] lg:w-full
            flex justify-center
            pt-[2vw]
            '>

              <div className='
              bg-white
              lg:h-[60%] lg:w-[80%]
              lg:rounded-[3.6vh] rounded-[1.95vw]
              flex justify-center items-center
              p-[1vh]
              '>
                {/* left */}
                <div className='
                relative
                h-full w-[50%]
                lg:rounded-[3vh]
                overflow-hidden
                '>

                  <img className='
                  scale-230
                  grayscale
                  -translate-x-1/3
                  ' src="/images/bot.png" alt="" />

                  <h1 className='
                  absolute top-[-20vh] left-[20vw] -translate-x-1/2 -rotate-90
                  text-[5vw] text-white
                  font-bold
                  '>95</h1>

                </div>

                {/* right */}
                <div className='
                relative
                h-full w-[50%]
                leading-[1.3vw]
                flex
                items-center
                '>
                  <h1 className='text-[1.3vw]'>percent of <br />routine questions <br />handled<br />automatically</h1>
                </div>

                

              </div>

            </div>

      </div>

    </div>
    </>
  )
}

export default App
