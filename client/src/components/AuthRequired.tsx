'use client'
import { redirect } from 'next/navigation'
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

export const AuthRequired =({ children }) => {

  let user:any = undefined
	if (typeof window !== 'undefined') user = sessionStorage?.getItem("user")
  if(user) return <>{children}</>
  if(user === undefined) return  <>Loading...</>
  else  {
    Router.push(`/`)
    return<>Loading...</>}
};