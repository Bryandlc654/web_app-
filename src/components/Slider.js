import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import '../css/swiper.css';

export default function App() {
    return (
        <>
            <div className='swiper__container'>
                <Swiper
                    loop={true}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay,Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='slide1'>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    1
                                </span>
                                <span>
                                    Elige tus productos
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    2
                                </span>
                                <span>
                                    Haz tu pedido
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    3
                                </span>
                                <span>
                                    Paga con yape
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slide1'>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    1
                                </span>
                                <span>
                                    Elige tus productos
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    2
                                </span>
                                <span>
                                    Haz tu pedido
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    3
                                </span>
                                <span>
                                    Paga con yape
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slide1'>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    1
                                </span>
                                <span>
                                    Elige tus productos
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    2
                                </span>
                                <span>
                                    Haz tu pedido
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    3
                                </span>
                                <span>
                                    Paga con yape
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slide1'>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    1
                                </span>
                                <span>
                                    Elige tus productos
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    2
                                </span>
                                <span>
                                    Haz tu pedido
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    3
                                </span>
                                <span>
                                    Paga con yape
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='slide1'>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    1
                                </span>
                                <span>
                                    Elige tus productos
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    2
                                </span>
                                <span>
                                    Haz tu pedido
                                </span>
                            </div>
                            <div className='slide1__payments'>
                                <span className='slide1__payments-number'>
                                    3
                                </span>
                                <span>
                                    Paga con yape
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    
                </Swiper>
            </div>
        </>
    );
}