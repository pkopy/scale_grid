import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import KTPNetXMinus from '../img/ktp/KTPNetXMinus.png'
import KTPNetTminus from '../img/ktp/KTPNetTMinus.png'
import KTPNet2TMinus from '../img/ktp/KTPNet2TMinus.png'
import ktpNetto from '../img/ktp/ktpNetto.png'
import ktpTara from '../img/ktp/ktpTara.png'
import KTPNetTPlus from '../img/ktp/KTPNetTPlus.png'
import KTPNet2TPlus from '../img/ktp/KTPNet2TPlus.png'
import KTPNetOk from '../img/ktp/KTPNetOk.png'
import KTPNetError from '../img/ktp/KTPNetError.png'
import KTPNetWarning from '../img/ktp/KTPNetWarning.png'
import KTPNetOdchStand from '../img/ktp/KTPNetOdchStand.png'
import './Ktp.scss'

const useStyles = makeStyles(theme => ({
    ktpSection: {
        width: '33.3%',
        height: '100%',
        borderRight: '1px solid rgb(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    ktpUnderSection: {
        width: '100%',
        height: '50%',
        borderBottom: '1px solid rgb(0,0,0,0.2)',
    },
    img: {
        left: 10,
        top: 5,
        position: 'relative',
        width: 50
    },
    text: {
        textAlign: 'right',
        marginRight: 10,
        marginTop: 5,
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: 0,
        fontFamily:'Courier New',
        fontSize: '1.2em'

    }

}));
export default function KtpPanel(props) {
    const classes = useStyles();
    const {RECORD} = props.ktp;
    return (
        <div className={'ktpContainer'} style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#D0D0D0",
            width: '100%',
            height: '100%'
        }}>
            <div style={{width: '100%', height: '100%', overflow: 'hidden', display: "flex"}}>
                <div className={classes.ktpSection} >
                    {RECORD && !RECORD.IsAverageTare&&<div className={classes.img}>
                        <img src={KTPNetXMinus} width={40} alt={'KTPNetXMinus'}/>
                    </div>}
                    {RECORD && RECORD.IsAverageTare&&<div className={classes.img}>
                        <img src={KTPNetOdchStand} width={40} alt={'KTPNetOdchStand'}/>
                    </div>}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: RECORD && RECORD.XColor,
                        opacity: '0.5',
                        position:"absolute",
                        top: 0
                    }}/>
                    {RECORD && !RECORD.IsAverageTare&&<div className={classes.text}>
                        {RECORD && <p>{RECORD.Qn}</p>}
                        {RECORD && <p>{RECORD.X}</p>}
                        {RECORD && <p>{RECORD.Min}</p>}
                        {RECORD && RECORD.IsInternal &&<p>{RECORD.Max}</p>}
                    </div>}
                    {RECORD && RECORD.IsAverageTare&&<div className={classes.text}>
                        {RECORD && <p>{RECORD.averageTareSdLimit}</p>}
                        {RECORD && <p>{RECORD.averageTareValue}</p>}
                        {RECORD && <p>{RECORD.averageTareSd}</p>}
                    </div>}
                </div>


                <div className={classes.ktpSection}>
                    <div className={classes.ktpUnderSection} style={{position:"relative"}}>
                        {RECORD && <div className={classes.img}>
                            <img src={KTPNetTminus} width={40} alt={'KTPNetTMinus'}/>

                        </div>}
                        <div style={{position:"absolute", left:8, fontFamily:'Courier New', zIndex:2, fontSize:'1.2em'}}>{RECORD && <p>{RECORD.T1Value}</p>}</div>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: RECORD && RECORD.T1Color,
                            opacity: '0.5',
                            position:"absolute",
                            top: 0
                        }}/>

                        <div className={classes.text}>
                            {RECORD && <p>{RECORD.T1Max}</p>}
                            {RECORD && <p>{RECORD.T1Count}</p>}

                        </div>

                        {/*<div style={{width: '100%', height:'100%', background:RECORD&&RECORD.T1Color, opacity:'0.5'}}/>*/}

                    </div>
                    <div style={{position:"relative", height: '50%'}}>
                        {RECORD && <div className={classes.img}>
                            <img src={KTPNet2TMinus} width={40} alt={'KTPNetT2Minus'}/>

                        </div>}
                        <div style={{position:"absolute", left:8, fontFamily:'Courier New', zIndex:2, fontSize:'1.2em'}}>{RECORD && <p>{RECORD.T12Value}</p>}</div>

                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: RECORD && RECORD.T12Color,
                            opacity: '0.5',
                            position:"absolute",
                            top: 0
                        }}/>
                        <div className={classes.text}>
                            {RECORD && <p>{RECORD.T12Max}</p>}
                            {RECORD && <p>{RECORD.T12Count}</p>}
                            {/*{RECORD && <p>{RECORD.T12Value}</p>}*/}
                        </div>
                    </div>
                </div>

                <div className={classes.ktpSection} style={{borderRight: 'none'}}>
                    <div className={classes.ktpUnderSection} >
                        {RECORD && !RECORD.IsInternal &&<div className={classes.img}>
                            <img src={ktpNetto} width={40} alt={'ktpNetto'}/>
                        </div>}

                        {RECORD && !RECORD.IsInternal &&<div className={classes.img}>
                            <img src={ktpTara} width={40} alt={'ktpTara'}/>
                        </div>}

                        {RECORD && RECORD.IsInternal &&<div className={classes.img}>
                            <img src={KTPNetTPlus} width={40} alt={'KTPNetTPlus'}/>
                        </div>}

                        {RECORD && RECORD.IsInternal &&<div style={{position:"absolute", left:8, fontFamily:'Courier New', zIndex:2, fontSize:'1.2em'}}>{RECORD && <p>{RECORD.T1ValuePlus}</p>}</div>}
                        <div style={{
                            width: '100%',
                            height: '50%',
                            background: RECORD && RECORD.T1PlusColor,
                            opacity: '0.5',
                            position:"absolute",
                            top: 0
                        }}/>
                        {RECORD && !RECORD.IsInternal && <div className={classes.text}>
                            <p>{RECORD.Netto}</p>
                            <p>{RECORD.Tara}</p>
                        </div>}
                        {RECORD && RECORD.IsInternal && <div className={classes.text}>
                            <p>{RECORD.T1MaxPlus}</p>
                            <p>{RECORD.T1CountPlus}</p>
                            {/*<p>{RECORD.T1ValuePlus}</p>*/}
                        </div>}
                    </div>


                    <div style={{textAlign:"left",fontFamily:'Courier', height: '50%', position: "relative"}}>
                        {RECORD && RECORD.IsInternal &&<div className={classes.img}>
                            <img src={KTPNet2TPlus} width={40} alt={'KTPNet2TPlus'}/>

                        </div>}
                        {RECORD && RECORD.IsInternal &&<div style={{position:"absolute", left:8, fontFamily:'Courier New', zIndex:2, fontSize:'1.2em'}}>{RECORD && <p>{RECORD.T12ValuePlus}</p>}</div>}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: RECORD && RECORD.T12PlusColor,
                            opacity: '0.5',
                            position:"absolute",
                            top: 0
                        }}/>
                        {RECORD && RECORD.IsInternal && <div className={classes.text}>
                            <p>{RECORD.T12MaxPlus}</p>
                            <p>{RECORD.T12CountPlus}</p>
                            {/*<p>{RECORD.T12ValuePlus}</p>*/}
                        </div>}
                        <div style={{display:"flex"}}>

                            {RECORD && !RECORD.IsInternal && <div style={{transform:'translate(10px, 10px)'}}>
                                <p>STATUS:</p>
                                <p>{RECORD.StatusText}</p>
                            </div>}

                            {RECORD && !RECORD.IsInternal && RECORD.Status === 'Ok' &&<div className={classes.img} style={{marginRight:20, marginLeft:"auto"}}>
                                <img src={KTPNetOk} width={50} alt={'KTPNetOK'}/>
                            </div>}

                            {RECORD && !RECORD.IsInternal && RECORD.Status === 'Error' &&<div className={classes.img} style={{marginRight:20, marginLeft:"auto"}}>
                                <img src={KTPNetError} width={50} alt={'KTPNetError'}/>
                            </div>}

                            {RECORD && !RECORD.IsInternal && RECORD.Status === 'Warning' &&<div className={classes.img} style={{marginRight:20, marginLeft:"auto"}}>
                                <img src={KTPNetWarning} width={50} alt={'KTPNetWarning'}/>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>

            <div style={{width: '100%', textAlign: "left", height: 30, borderTop: '1px solid rgb(0,0,0,0.2)'}}>
                {RECORD && <p style={{margin: 5, fontFamily:'Courier New'}}>{RECORD.Command}</p>}
            </div>
        </div>

    )
}