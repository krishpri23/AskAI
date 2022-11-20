import React from 'react'

export default function Main() {

    // display flex column 

    return <main className='main-content'>
    
                <h1 className='name'>Krishnapriya Amarnath</h1>
                <h2 className='designation'> Frontend Developer</h2>
                <p className='website'>mywebsite.com</p>
                {/* display flex default  */}
                <div className="button-div">
                    <button className="button" id='email'> Email </button>
                    <button className="button" id='linkedin'> LinkedIn </button>
                </div>
                <div className='self-intro'>
                    <h1 className='title'> About </h1>
                    <p className='content'> I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.</p>
                    <h2 className='title'> Interests </h2>
                    <p className='content'> Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.</p>
                </div>
        
    </main>
}