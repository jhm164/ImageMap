
import React, { Component } from 'react'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Snackbar,Popover,Typography } from '@mui/material';
import Axios from "axios"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { margin } from '@mui/system';
const theme = createTheme({ palette: { mode: 'dark', margin: "0px" } });
const serverUrl = "http://localhost:4000/"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));
export default class ImageMap extends Component {
    constructor() {
        super()
        this.state = {
            imagePath: "http://localhost:4000/images/sonar_map.png",
            mapData: [],
            "title": "",
            "coords": "",
            "shape": "",
            message: "",
            open: false,
            openInfo: false,
            left:0,
            right:0,
            showTitle:""

        }
        this.fetchData = this.fetchData.bind(this)
        this.addNewData = this.addNewData.bind(this)
        this.openInfoDialog=this.openInfoDialog.bind(this)
        this.handleCloseInfo=this.handleCloseInfo.bind(this)
    }
    componentDidMount() {

        this.fetchData()
    }
    handleClose(e) {
        e.preventDefault();
        this.setState({ open: false })
    }
    handleCloseInfo() {

        this.setState({ openInfo: false })
    }
    fetchData() {
        Axios.get(serverUrl).then((responseData) => {
            console.log("data", responseData)
            if (responseData && responseData.data) {
                this.setState({ mapData: responseData.data.data })
                console.log(this.state.mapData)
            }
        }).catch((err) => {
            console.log("err", err)
        })
    }
    addNewData(e) {
        e.preventDefault();
        Axios.post(serverUrl, {
            "title": this.state.title,
            "coords": this.state.coords,
            "shape": this.state.shape
        }).then((responseData) => {
            console.log("data", responseData)
            if (responseData && responseData.data) {


                this.fetchData()
                // if(responseData.data.state==200){
                this.setState({ open: true, message: "Data added Successfully" })

                // }
            }
        }).catch((err) => {
            console.log("err", err)
        })
    }
    openInfoDialog(data) {

        this.setState({ openInfo: true,showTitle:data})
      

    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Paper container spacing={2} p={3} sx={{ height: "100vh", margin: "0px" }}>



                    <Box
                        sx={{
                            p: 2,
                            pt: 4,

                            display: 'grid',
                            justifyItems: "center",
                            gridTemplateColumns: { md: '1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <img src={this.state.imagePath} alt="Workplace" usemap="#workmap" />
                        <MapData mapData={this.state.mapData} openInfoDialog={this.openInfoDialog} />
                    </Box>



                    <Grid container spacing={2} sx={{
                        ...theme.typography.body2,
                        textAlign: 'center',
                        color: theme.palette.text.secondary,
                        height: 60,
                        lineHeight: '60px',
                        padding: '1rem',
                    }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Item> <TextField id="outlined-basic" sx={{ width: "100%" }} onChange={(e) => {
                                this.setState({ title: e.target.value })
                            }} label="title" variant="outlined" /></Item>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField id="outlined-basic" sx={{ width: "100%" }} onChange={(e) => {
                                this.setState({ coords: e.target.value })
                            }} label="Co-ords" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField id="outlined-basic" sx={{ width: "100%" }} onChange={(e) => {
                                this.setState({ shape: e.target.value })
                            }} label="shape" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button id="outlined-basic" sx={{ width: "100%", height: "100%" }} onClick={(e) =>
                                this.addNewData(e)
                            } label="shape" variant="contained" >ADD</Button>
                        </Grid>
                    </Grid>

                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        message={this.state.message}
                        action={this.handleClose}

                    />
                    <Popover

                        open={this.state.openInfo}
                        onClose={this.handleCloseInfo}
                        // anchorOrigin={{
                        //     vertical: 'bottom',
                        //     horizontal: 'left',
                            
                        // }}
                        sx={{left:this.state.left,right:this.state.right}}
                       
                    >
                        <Typography sx={{ p: 2 }}>{this.state.showTitle}</Typography>
                    </Popover>
                </Paper>

            </ThemeProvider>
        )
    }
}
function MapData(props) {
    console.log(props.MapData)
    function clickOnArea(e, coords) {
        e.preventDefault();
        // console.log("clickOnArea", index)
        props.openInfoDialog(coords)
    }
    if (props && props.mapData) {
        return (
            <map name="workmap">
                {props.mapData.map((item, index) => {
                    return <area shape={item.shape} coords={item.coords} title={item.title} onClick={(e) => clickOnArea(e,item.title)} />
                })}

            </map>
        )
    } else {
        <map name="workmap">

        </map>
    }
}
