import React from 'react'
import "../scss/widget.scss"
import {KeyboardArrowDown, PersonOutlineOutlined, ShoppingCartOutlined, MonetizationOnOutlined, AccountBalanceWalletOutlined} from '@mui/icons-material';

const Widget = ({type}) => {
  let content;
  const amount= 123;
  const diff= 123;
  switch (type){
    case "user":
      content= {
        title: "USER",
        isMoney: false,
        link: "View all users",
        icon: (
        <PersonOutlineOutlined 
        className='widget-icon' 
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)"
        }}
        />)
      }
      break;
    
      case "order":
      content= {
        title: "ORDER",
        isMoney: false,
        link: "View all orders",
        icon: (
        <ShoppingCartOutlined 
        className='widget-icon'
        style={{
          color: "goldenrod",
          backgroundColor: "rgba(218,165,32, 0.2)"
        }}
        />
        )
      }
      break;
    
      case "earning":
        content= {
          title: "EARNING",
          isMoney: true,
          link: "View net earnings",
          icon: (
          <MonetizationOnOutlined 
          className='widget-icon'
          style={{
            color: "green",
            backgroundColor: "rgba(0,128,0, 0.2)"
          }}
          />)
        }
        break;

        case "balance":
          content= {
            title: "BALANCE",
            isMoney: true,
            link: "See details",
            icon: (
            <AccountBalanceWalletOutlined 
            className='widget-icon'
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)"
            }}
            />)
          }
          break;

        default:
        break;
  }

  return (
    <div className='widget-container'>
        <div className="widget-leftSide">
            <span className='widget-title'>{content.title}</span>
            <span className='widget-counter'>
              {content.isMoney && "$"}
              {amount}
            </span>
            <span className='widget-link'>{content.link}</span>
        </div>

        <div className="widget-rightSide">
            <div className='widget-percentage positive'>
                <KeyboardArrowDown className='widget-icon'/>
                <span className='widget-percentage-value'>{diff} %</span>
            </div>
            {content.icon}
            
        </div>
    </div>
  )
}

export default Widget