'use client'
import Router from 'next/router';
import React from 'react';

export const AuthNotRequired = ({ children }) => {

  let user:any = undefined
    if (typeof window!== 'undefined') user = sessionStorage?.getItem("user")

  if (!user) return children;

  if (user) {
    Router.push(`/todoList`);
    return  <>Loading...</>

  } 

  return <>Loading...</>;
};