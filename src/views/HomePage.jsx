import React from 'react'
import LayoutComponent from './components/Layout/Layout';
import { useWindowWidth  } from './handle/size/size';
import { useState } from 'react';
import { useEffect } from 'react';

const HomePage = () => {
	const anchoPagina = useWindowWidth(useState, useEffect);
  return (
    <LayoutComponent anchoPagina={anchoPagina} />
  );
}
export default HomePage;