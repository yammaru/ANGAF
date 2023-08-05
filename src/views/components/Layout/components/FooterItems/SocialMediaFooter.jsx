import React from 'react';
import { GithubOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';



const SocialMediaFooter = () => {
  return (
    <div >
      <a href="https://github.com/usuario" target="_blank" rel="noopener noreferrer">
        <GithubOutlined className="social-icon" />
      </a>
      <a href="https://twitter.com/usuario" target="_blank" rel="noopener noreferrer">
        <TwitterOutlined className="social-icon" />
      </a>
      <a href="https://instagram.com/usuario" target="_blank" rel="noopener noreferrer">
        <InstagramOutlined className="social-icon" />
      </a>
    </div>
  );
};

export default SocialMediaFooter;
