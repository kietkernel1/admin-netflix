import React from 'react'
import "../scss/progressBar.scss"
import {MoreVert, KeyboardArrowDown} from '@mui/icons-material/';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = () => {
  return (
    <div className='progress-container'>
        <div className='progress-top'>
            <p>Total Revenue</p>
            <MoreVert className='progress-icon'/>    
        </div>
        
        <div className='progress-bottom'>
            <CircularProgressbar value="66" text="66%" strokeWidth={5} className="progress-circleChart"/>
            <p>Total sales made today</p>
            <h1>$420</h1>
            <p className='progress-desc'>Previous transactions processing. Last payments may not be included</p>

            <div className='progress-result'>
                <div className="progress-result-item">
                    <span>Target</span>
                    <div className="progress-result-value negative">
                    <KeyboardArrowDown className='progress-icon'/>
                    $12.5k
                        </div>
                </div>

                <div className="progress-result-item">
                    <span>Last Week</span>
                    <div className="progress-result-value positive">
                    <KeyboardArrowDown className='progress-icon'/>
                       $12.5k
                        </div>
                </div>

                <div className="progress-result-item">
                    <span>Last Month</span>
                    <div className="progress-result-value positive">
                        <KeyboardArrowDown className='progress-icon'/>
                        $12.5k
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProgressBar