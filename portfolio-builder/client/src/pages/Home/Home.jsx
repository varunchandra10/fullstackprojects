import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Showloading, HideLoading, SetPortfolioData } from '../../redux/rootSlice';
import API from '../../api/api';

import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Leftsider from './Leftsider';
import Educations from './Education';

const Home = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { userId } = useParams();

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(Showloading());
      const res = await API.get(`/api/get-portfolio-data/${userId}`);
      dispatch(SetPortfolioData(res.data));
      dispatch(HideLoading());
    } catch (error) {
      console.error(error);
      dispatch(HideLoading());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      getPortfolioData();
    }
  }, [userId, getPortfolioData]);

  return (
    <>
      <div className='shadow-a fixed w-[100%] z-10'>
        <Header displayAll />
      </div>
      {portfolioData && (
        <div className='bg-primary pl-[150px] sm:px-5'>
          <Intro />
          <About />
          <Educations />
          <Experiences />
          <Projects />
          <Contact />
          <Footer />
          <Leftsider />
        </div>
      )}
    </>
  );
};

export default Home;
