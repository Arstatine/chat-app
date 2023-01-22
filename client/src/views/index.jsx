import React from 'react';
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div id='parallax-world-of-ugg'>
      <section>
        <div className='title'>
          <h3>Connected</h3>
          <br />
          <h1>CHAT APP</h1>
          <br />
          <h4>
            <a href='/login' className='link-btn'>
              Login
            </a>
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <a href='/register' className='link-btn'>
              Register
            </a>
          </h4>
        </div>
      </section>

      <section>
        <div className='parallax-one'>
          <h2>COMMUNICATE</h2>
        </div>
      </section>

      <section>
        <div className='block'>
          <p>
            <div className='first-character sc'>About</div>
            <p className='line-break margin-top-10'></p>
            <br />
            Chat App is a messaging web application that connects users from all
            over the world. With its user-friendly interface and real-time
            messaging feature, Chat App makes it easy for people to communicate
            with each other regardless of their location. Whether you're looking
            to chat with friends and family or connect with new people, Chat App
            is the perfect platform to do so. With a wide range of features such
            as private chat, group chats and file sharing, Chat App offers an
            engaging and interactive experience for its users. Overall, Chat App
            is the perfect solution for anyone looking to stay connected with
            friends and family, build a community, or conduct business. With its
            real-time messaging, file sharing, and group functionality, it has
            everything you need to stay engaged and productive. So why wait?
            Sign up today and start connecting with people from around the globe
            and start experiencing the power of real-time communication with
            Chat App!
          </p>
          <div className='margin-top-10 bold-700'>
            GitHub Link: <a href='/'>hell</a>
          </div>
        </div>
      </section>

      <section>
        <div className='parallax-two'>
          <h2>CONNECT WITH FRIENDS</h2>
        </div>
      </section>

      <section>
        <div className='block'>
          <p>
            <div className='first-character ny'>Contact Us</div>
            <p className='line-break margin-top-10'></p>
            <br />
            Breaking into the New York fashion world is no easy task. But by the
            early 2000's, UGG Australia began to take it by storm. The evolution
            of UGG from a brand that made sheepskin boots, slippers, clogs and
            sandals for an active, outdoor lifestyle to a brand that was now
            being touted as a symbol of a stylish, casual and luxurious
            lifestyle was swift. Much of this was due to a brand repositioning
            effort that transformed UGG into a high-end luxury footwear maker.
            As a fashion brand, UGG advertisements now graced the pages of Vogue
            Magazine as well as other fashion books. In the mid 2000's, the
            desire for premium casual fashion was popping up all over the world
            and UGG was now perfectly aligned with this movement.
          </p>
          <p className='line-break margin-top-10'></p>
          <p className='margin-top-10'>
            Fueled by celebrities from coast to coast wearing UGG boots and
            slippers on their downtime, an entirely new era of fashion was
            carved out. As a result, the desire and love for UGG increased as
            people wanted to go deeper into this relaxed UGG experience. UGG
            began offering numerous color and style variations on their
            sheepskin boots and slippers. Cold weather boots for women and men
            and leather casuals were added with great success. What started as a
            niche item, UGG sheepskin boots were now a must-have staple in
            everyone's wardrobe. More UGG collections followed, showcasing
            everything from knit boots to sneakers to wedges, all the while
            maintaining that luxurious feel UGG is known for all over the world.
            UGG products were now seen on runways and in fashion shoots from
            coast to coast. Before long, the love spread even further.
          </p>
        </div>
      </section>

      <section>
        <div className='parallax-three'>
          <h2>EXCHANGE INFORMATION</h2>
        </div>
      </section>

      <section>
        <div className='block'>
          <p>
            <div className='first-character atw'>Developer</div>
            <p className='line-break margin-top-10'></p>
            <br />
            <center>
              <div className='profile-pic'></div>
            </center>
            <br />
            <center>
              <h1>Xenon Vergara</h1>
            </center>
            <p className='margin-top-10'></p>
            Hi, I'm Xenon Vergara a freelance web developer and web designer
            with a strong passion for creating visually stunning and functional
            websites. Attention to detail, ability to deliver projects on time,
            and excellent communication skills are my expertise. Whether you are
            looking to create a new website from scratch or need to update an
            existing one, I have the skills and experience to bring your vision
            to life.
          </p>
          <p className='line-break margin-top-10'></p>
          <div className='margin-top-10 footer-profile'>
            <ul>
              <li>
                <a
                  href='https://www.facebook.com/xenon.vergara.2201/'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Icon icon='ic:baseline-facebook' inline={true} />
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/arstatine_xrv'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Icon icon='ph:instagram-logo-fill' inline={true} />
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/Arstatine'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Icon icon='mdi:github' inline={true} />
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/xenon-vergara-8b66391b9'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Icon icon='mdi:linkedin' inline={true} />
                </a>
              </li>
              <li>
                <a
                  href='https://xenon-vergara.netlify.app'
                  rel='noreferrer'
                  target='_blank'
                >
                  <Icon icon='mdi:web' inline={true} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; Chat App 2023</p>
      </footer>
    </div>
  );
}
