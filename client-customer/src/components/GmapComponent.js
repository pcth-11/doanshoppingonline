import React, { Component } from 'react'

class Gmap extends Component {
    render() {
        return(
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className='text-center text-2xl font-bold mb-4'>MY LOCATION</h2>
                <div className="w-full max-w-4xl">
                    <iframe 
                        title='gmap' 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7878052273554!2d106.69744577479297!3d10.82754445824929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmcgLSBDxqEgc-G7nyBjaMOtbmg!5e0!3m2!1svi!2s!4v1721392443484!5m2!1svi!2s"
                        className="w-full h-[600px]"
                        style={{ border:0 }} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        );
    }
}

export default Gmap;