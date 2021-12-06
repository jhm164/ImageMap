import React, { Component } from 'react'
const images = [
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MzAvb3JpZ2luYWwvc2h1dHRlcnN0b2NrXzExMTA1NzIxNTkuanBn",
    "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
    "https://i.ytimg.com/vi/jpsGLsaZKS0/maxresdefault.jpg"
]
export default class ImageSlideshow extends Component {
    constructor() {
        super();
        this.state = {

            counter: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.counter == images.length - 1) {
                this.setState({ counter: 0 })
            } else {
                this.setState({ counter: this.state.counter + 1 })
            }
        }, 1000);
    }
    render() {
        return (
            <div >

                <img src={images[this.state.counter]} style={{ height: "200px", width: "200px" }} ></img>
            <p>{this.state.counter}</p>
            </div>
        )
    }
}
