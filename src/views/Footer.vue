<template>
<footer id="footer" class="footer">

<div class="footer-container container">
  <div class="footer-section row gy-3">
    <div class="footer-col col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
      <i class="bi bi-geo-alt icon"></i>
      <div>
        <h4>About Us</h4>
        <p>
          Subscribe<br>
          Advertise With Us<br>
        </p>
      </div>

    </div>

    <div class="footer-col col-lg-3 col-md-6 col-sm-12 footer-links d-flex justify-content-center">
      <i class="bi bi-telephone icon"></i>
      <div>
        <h4>Contact Us</h4>
        <p>
          <strong>Phone:</strong> +1 5589 55488 55<br>
          <strong>Email:</strong> SustainablEats@gmail.com<br>
        </p>
      </div>
    </div>

    <div class="footer-col col-lg-3 col-md-6 col-sm-12 footer-links d-flex justify-content-center">
      <i class="bi bi-clock icon"></i>
      <div>
        <h4>Terms & Conditions</h4>
        <p>
          Community Guidelines<br>
          Privacy Notice<br>
        </p>
      </div>
    </div>

    <div class="footer-col col-lg-3 col-md-6 col-sm-12 footer-links">
      <h4>Follow Us</h4>
      <div class="social-links d-flex">
        <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
        <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
      </div>
    </div>

  </div>
</div>

<div class="container">
  <div class="copyright">
    &copy; Copyright <strong><span class="ms-3">Sustainabl<font style="color:lawngreen">Eats</font></span></strong>. All Rights Reserved
  </div>
  <div class="credits">
  </div>
</div>

</footer><!-- End Footer -->
<!-- End Footer -->
  </template>
  
  <script>
  import 'bootstrap-icons/font/bootstrap-icons.css';

  export default {
    name: 'Footer',
  }
  </script>
  
  <style scoped>
    /* Your footer styles here */

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
.footer {
    margin-top: 5%;
    font-size: 14px;
    background-color: #1f1f24;
    padding: 50px 0;
    color: rgba(255, 255, 255, 0.7);

  }

  .social-links {
    justify-content: center;
  }

  .footer .icon {
    margin-right: 15px;
    font-size: 24px;
    line-height: 0;
  }

  .footer h4 {
    font-size: 16px;
    font-weight: bold;
    position: relative;
    padding-bottom: 5px;
    color: #fff;
  }

  .footer .footer-links {
    margin-bottom: 30px;
  }

  .footer .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer .footer-links ul li {
    padding: 10px 0;
    display: flex;
  }

  .footer .footer-links ul li:first-child {
    padding-top: 0;
  }

  .footer .footer-links ul a {
    color: rgba(255, 255, 255, 0.6);
    transition: 0.3s;
    display: inline-block;
    line-height: 1;
  }

  .footer .footer-links ul a:hover {
    color: #fff;
  }

  .footer .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    margin-right: 10px;
    transition: 0.3s;
  }

  .footer .social-links a:hover {
    color: #fff;
    border-color: #fff;
  }

  .footer .copyright {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer .credits {
    padding-top: 4px;
    text-align: center;
    font-size: 13px;
  }

  .footer .credits a {
    color: #fff;
  }

  /* Responsive styles using media queries */
  @media (max-width: 1200px) {
    .footer .footer-links ul li {
      width: 50%;
    }
  }

  @media (max-width: 992px) {
    .footer .footer-links ul li {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .footer .footer-links ul li {
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    .footer .footer-links ul li {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column; /* Add this line to ensure vertical alignment */
    }
  }
  </style>