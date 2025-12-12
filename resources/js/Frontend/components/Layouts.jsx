import React from 'react'
import { Col } from 'react-bootstrap'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layouts() {
  return (
    <>
        <Col>
            <Header/>
            <main className="page_content">
              <Outlet />
            </main>
            <Footer/>
        </Col>
    </>
  )
}

export default Layouts
