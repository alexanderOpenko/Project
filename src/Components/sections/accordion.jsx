import React from 'react'
import { useState } from 'react'
import icons from '../../Assets/icons'

const Accordion = () => {
    const [selectedIndex, setSelectedIndex] = useState('')
    const plus = icons('plus')
    const minus = icons('minus')

    const setAccordionIndex = (i) => {
        if (selectedIndex === i) {
            setSelectedIndex('')
            return
        }

        setSelectedIndex(i)
    }

    return (<div className='accordion'>
        {accordionContent.map((el, i) => {
            return <div className='accordion_item'>
                <h4 className='accordion_title' onClick={() => setAccordionIndex(i)}>
                    {el.title}

                    <span>
                    {i === selectedIndex ? minus : plus} 
                    </span>
                </h4>

                <div className="accordion_content-wrapper body2">
               <div className={i === selectedIndex ? 'accordion_content accordion--active' : 'accordion_content'}>
                    {el.text}
                </div>
                </div>
            </div>
        })}
    </div>
    )
}

const accordionContent = [
    {
        title: 'Quality everyone wants',
        text: 'We want our clothes to be durable, to last more than a couple of seasons. We want sturdy clothes garments that we can move in without having to worry about ripping seams or popping buttons. That\'s why you needs our high quality clothes made of best practices and natural materials.'
    },
    {
        title: 'What is street style ?',
        text: 'It is a comprehensive approach to fashion and includes styles which intersect, differ from mainstream fashion considerations and are based on individualism and not strictly focusing on current fashion trends.'
    },
    {
        title: 'Lorem ipsum',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    }
]


export default Accordion