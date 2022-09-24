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
            return <div key={i} className='accordion_item'>
                <h4 className='accordion_title' onClick={() => setAccordionIndex(i)}>
                    {el.title}

                    <span>
                    {i === selectedIndex ? minus : plus} 
                    </span>
                </h4>

                <div className="accordion_content-wrapper body3">
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
        title: 'What is street style ?',
        text: 'It is a comprehensive approach to fashion and includes styles which intersect, differ from mainstream fashion considerations and are based on individualism and not strictly focusing on current fashion trends.'
    },
    {
        title: 'Quality everyone wants',
        text: 'We want our clothes to be durable, to last more than a couple of seasons. We want sturdy clothes garments that we can move in without having to worry about ripping seams or popping buttons. That\'s why you needs our high quality clothes made of best practices and natural materials.'
    },
    {
        title: 'Comfortable is impoortant',
        text: 'Our clothes combines style and comfort without any inconvenience to the body.'
    }
]


export default Accordion