import React, { useEffect } from 'react'
// import ExcelDataUpload from './ExcelDataUpload'
// import AllChartDisplay from '../Pages/AllChartDisplay'
import Cookie from 'js-cookie'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


function Banner() {

  const token = Cookie.get('Token')

  useEffect(() => {
    // console.log(token)
  }, [token])
  return (
    <div>
      <div className="hero min-h-[300px] bg-base-200  ">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src='../img/heroImage.png'
              className=" w-[800px]"
            />
            <div>
              <h1 className="text-5xl font-bold"><span className='text-blue-500'>R</span>ead <span className='text-blue-500'>B</span>usiness & <span className='text-blue-500'>A</span>cademics <span className='text-blue-500'>S</span>tatistics</h1>
              <p className="py-6">
                Explore meaningful charts and visualizations from business reports and academic research to understand trends, performance, and patterns at a glance.
                Whether you're a student, researcher, or business analyst, our platform helps you interpret statistics with clarity and ease.
              </p>
              {token ? <Link to='/uploadExcel'><button className="btn bg-blue-400">Upload Here</button></Link> :
                <button className="btn  bg-blue-500" onClick={() => toast.error("Please signIn/signUp first")}>Upload Here</button>}
            </div>
          </div>
        </div>
        {/* <div
          className="hero min-h-screen  "
          style={{
            backgroundImage:
              "url(https://t3.ftcdn.net/jpg/02/74/91/02/360_F_274910292_Xm3dgmmfMJVFrcjUR1eqJmIC7giRrsTF.jpg)",
                }}
                >
          <div className="hero-overlay "></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md ">
              <h1 className="mb-5 text-5xl font-bold -z-10">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div> */}
      </div>
      <div >
        {/* <AllChartDisplay /> */}
        <section id="about" className="bg-blue-100 py-4 px-6 md:px-20 scroll-smooth">
          <div className="max-w-4xl mx-auto text-center flex justify-between items-center ">
            <div className="text-lg text-gray-700 leading-relaxed mt-0  ">
              <h2 className="text-3xl font-bold mb-4"><span className='text-blue-500'>A</span>bout <span className='text-blue-500'>U</span>s</h2>
              <p>
                Welcome to <strong>ChartEase</strong> – your go-to platform for effortless data visualization.
                We help users transform complex Excel data into beautiful, interactive charts in just a few clicks.
                Whether you're analyzing business metrics or academic data, we make your insights shine.
              </p>
            </div>
            <img src="../img/aboutUs2.png" alt="" className=' w-[600px]' />
          </div>
        </section>
        <div className='bg-base-200 pb-10'>
        <h2 className="text-3xl font-bold mb-4 text-center pt-4 "><span className='text-blue-500'>W</span>hy <span className='text-blue-500'>C</span>hoose <span className='text-blue-500'>U</span>s ?</h2>
        <div className='flex  m-10 ' >
          <div className="card bg-base-100 w-96 shadow-sm border-2 mr-2">
            <figure className="px-10 pt-10">
              <img
                src="../img/noCoding.png"
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p>No coding needed — anyone can create beautiful charts</p>
              <div className="card-actions">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-sm border-2 mr-2">
            <figure className="px-10 pt-10">
              <img
                src="../img/support.png"
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p>Support for 7+ chart types</p>
              <div className="card-actions">
                <button className="btn ">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-sm border-2 mr-2">
            <figure className="px-10 pt-10">
              <img
                src="../img/saveManage1.png"
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p> Save & manage all your charts</p>
              <div className="card-actions">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-sm border-2">
            <figure className="px-10 pt-10">
              <img
                src="../img/secure1.png"
                alt="Shoes"
                className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <p>100% secure — your data stays private</p>
              <div className="card-actions">
                <button className="btn ">Buy Now</button>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default Banner