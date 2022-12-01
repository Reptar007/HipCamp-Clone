import './footer.css'
import logo from '../assets/images/logo.svg'

function Footer() {
    return (
      <div className="footer_container">
        <div className="footer_wrapper">
          <img src={logo} alt="logo" />
          <div className="github-link">
            <div className='name'>
                <h5>Hipcamp Clone by</h5>
                <h4>Sebastian Antonucci</h4>
            </div>
            <a
              href="https://github.com/Reptar007"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fa-brands fa-github fa-5x"></i>
            </a>
          </div>
        </div>
      </div>
    );
}

export default Footer