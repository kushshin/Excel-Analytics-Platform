import React from 'react'

function Footer() {
  return (
    <div>
    <div className='items-center '>
 <footer id="contact"className="footer sm:footer-horizontal bg-blue-100 text-base-content pr-10 pb-10 pt-10 pl-40 mt-0  ">
  <nav>
    <h6 className="footer-title text-blue-500">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title text-blue-500">Company</h6>
    <a className="link link-hover">Career</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title text-blue-500">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title text-blue-500">Contact</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
      </div><br />
      <label>Enter your contact</label>
      <div className="join">
        <input
          type="text"
          placeholder="contact Number"
          className="input input-bordered" />
        <button className="btn bg-blue-400  ml-2">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
    </div>
    </div>
  )
}

export default Footer