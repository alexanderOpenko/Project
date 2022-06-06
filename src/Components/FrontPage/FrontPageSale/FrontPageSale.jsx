import React from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import s from './FrontPageSale.module.css'

class FrontPageSale extends React.Component {

    constructor(props) {
        super(props)
        this.gallery = React.createRef();
        this.slider = React.createRef();
        this.stage = React.createRef();
        this.navCtrl = React.createRef();
        this.prev = React.createRef();
        this.next = React.createRef();
        this.state = {
            margin: 10,		// расстояние между элементами [px]
            visibleItems: 4,		// сколько элементов показывать одновременно
            interval: 3000,	// задержка при автоматическом прокручивании [ms]
            nav: true,	// показать/скрыть кнопки next/prev
            baseTransition: 0.4,	// скорость анимации, при изменении CSS свойств
            current: 0,		// index координаты текущего элемента
            next: 0,		// index координаты следующего элемента
            show: 0
        }
    }


    componentDidMount() {
        // this.props.updateNewPhotoSaleGalleryCreator(jeansPhoto)
        this.show()//изменяю стейт чтобы сработал componentDidUpdate
    }

    show = () => {
        this.setState({
            show: 1
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.show !== this.state.show) {
            this.gallery = this.gallery.current
            this.slider = this.slider.current //все элементы галереи
            this.stage = this.stage.current //непосредственно галерея
            this.items = this.stage.childNodes
            this.count = this.items.length //длина элементов галереи
            this.init()
        }
    }


    init = () => {
// формируем каркас галереи
        this.setSizeCarousel();
// заполняем массив с координатами X каждого элемента слайдера
        this.setCoordinates();
// формируем управление слайдером в зависимости от настроек
        this.initControl();
// устанавливаем обработчики событий, если ещё не устанавливались
        this.registerEventsHandler();
    }

    setSizeCarousel = () => {
        this.widthSlider = this.slider.offsetWidth;
        this.max = this.count - this.state.visibleItems
        const width = (this.widthSlider - this.state.margin * (this.state.visibleItems - 1)) /
            this.state.visibleItems;
        this.width = width + this.state.margin
        // ширина контейнера '.stage', непосредственно в котором
        // расположены элементы слайдера
        this.widths = this.width * this.count;
        // задаётся стиль ширины контейнера '.stage'
        this.stage.style.width = this.widths + 'px';
        // перебираем коллекцию элементов слайдера и
        // прописываем ширину и правый отступ для каждого элемента
        for (let item of this.items) {
            item.style.cssText = `width:${width}px; margin-right:${this.state.margin}px;`;
            // после того, как каркас галереи построен, все размеры элементов
            // вычислены и прописаны в стилях, делаем карусель видимой через
            // свойство стиля 'visibility'
            setTimeout(() => {
                this.gallery.style.visibility = 'visible'
            }, 350);
        }
    }

    setCoordinates() {
        // координата первого элемента, от неё и будет идти отсчёт
        let point = 0;
        // добавляем новое свойство в объект 'options'
        // пока это пустой массив
        this.coordinates = [];//-width
        // заполняем в цикле массив пока количество его элементов
        // не станет равно количеству элементов слайдера,
        // т.е. будет записана координата X каждого элемента
        while (this.coordinates.length < this.count) {
            // добавляем в конец массива текущее значение переменной 'point'
            // которое равно координате X текущего элемента слайдера
            this.coordinates.push(point);
            // вычитаем из текущей координаты ширину блока, равную
            // сумме ширины элемента слайдера и отступа или другими
            // словами - расстояние между левыми границами элементов
            point -= this.width;
        }
    }

    initControl() {
        // объект с кнопками навигации 'prev / next'
        this.navCtrl = this.navCtrl.current;


        if (this.state.nav === true) {
            // кнопка 'prev'
            this.btnPrev = this.prev.current;
            // кнопка 'next'
            this.btnNext = this.next.current;
            // устанавливаем стили для кнопок 'prev' и 'next'
            this.setNavStyle();
            // делаем навигацию видимой
            this.navCtrl.dataset.hidden = false;
        }
    }

    setNavStyle() {
        // убираем у всех кнопок класс 'disable', теперь
        // обе кнопки выглядят активными
        this.btnPrev.className = ''
        this.btnNext.className = ''

        if (this.state.current == 0) {
            // если первый элемент является текущим, то блокируем попытку просмотра
            // предыдущего элемента, т.к. его не существует и делаем кнопку
            // 'prev' неактивной
            this.btnPrev.className = s.disable;
        } else if (this.state.current >= this.count - this.state.visibleItems) {
            // если последний элемент появился на экране, при этом не важен
            // его индекс, блокируем и делаем неактивной кнопку просмотра след.
            // элемента на экране будет наблюдаться столько элементов,
            // сколько указано в visibleItems
            this.btnNext.className = s.disable;
        }
    }


    registerEventsHandler(e) {
// управление кликом по кнопкам 'prev / next' объекта 'navCtrl'
        this.navCtrl.addEventListener('click', this.navControl.bind(this));
// управление постраничной навигацией точками
//this.dotsCtrl.addEventListener('click', this.dotsControl.bind(this));
//window.addEventListener('keydown', this.keyControl.bind(this))
    }

    navControl(e) {
// если клик был сделан не по элементу 'span' объекта
// navCtrl, прекращаем работу функции
        if (e.target.tagName != 'SPAN') return;
// определяем направление прокручивания галереи
// зависит от кнопки, по которой был сделан клик
// -1 - prev, 1 - next
        const d = (e.target.dataset.shift === 'next') ? 1 : -1;
// получаем координату Х элемента, до которого должен переместиться слайдер
        const x = this.getNextCoordinates(d);
// запускаем прокручивание галереи
        this.scroll(x, this.state.baseTransition);
    }

    getNextCoordinates(direction) {
        if (typeof (direction) !== 'number') return this.coordinates[this.state.current];
// попытка прокрутить к предыдущему элементу, когда текущим является первый элемент
        if (this.state.current == 0 && direction == -1 ||
            // попытка просмотреть следующую группу элементов при постраничной навигации, но
            // все элементы после текущего выведены во вьюпорт слайдера
            (this.state.current >= this.max) && direction == 1) return;
// получаем индекс следующего элемента
        this.setState({next: this.state.next += direction})
// возвращаем координату след. элемента - координату, до которой
// необходимо продвинуть галерею
        return this.coordinates[this.state.next];

    }

    scroll(x, transition) {
        // если аргумент х не является числом, прекращаем работу функции
        if (typeof (x) !== 'number') return;
        // прописываем новые стили для смещения (прокручивания) галереи
        // к следующему элементу
        this.stage.style.cssText =
            `width:${this.widths}px; height:${this.items[0].offsetHeight}px;
     transform:translateX(${x}px); transition:${transition}s`;
        // после прокручивания, индекс след. элемента становится текущим
        this.setState({
            current: (this.state.next < this.max) ? this.state.next : this.max
        })
        // меняем стили отображения кнопок управления в зависимости от
        // текущего индекса
        if (this.state.nav) this.setNavStyle();
        // меняем стили элементов постраничной навигации
        if (this.state.dots) this.setDotsStyle();
    }


    render() {
        return (
            <>
                <div className={s.sale}>
                    {/*<img src={image04021}/>*/}
                    <div className={s.gallery} ref={this.gallery}>
                        <h1>Джинси</h1>
                        <NavLink to='jeans/'>
                            <button className={s.salebutton}>
                                купуйте
                            </button>
                        </NavLink>
                        <div className={s.slider} ref={this.slider}>
                            <div className={s.stage} ref={this.stage}>
                                {this.props.jeansPhotos.map(p => {
                                    return <div>
                                        <NavLink to={'/sale/saleJeans/' + Number(this.props.jeansPhotos.indexOf(p))}>
                                            <img src={p.slidePhoto}/>
                                            <button>купить</button>
                                        </NavLink>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div>
                            <div className={s.navCtrl} ref={this.navCtrl} data-hidden="false">
                                <span ref={this.prev} data-shift="prev">&larr;</span>
                                <span ref={this.next} data-shift="next">&rarr;</span>
                            </div>
                            <ul className={s.dotsCtrl} ref='dotsCtrl' data-hidden="true"></ul>
                        </div>
                    </div>
                </div>
            </>
        )

    }

}

let mapStateToProps = (state) => {

    return ({
        jeansPhotos: state.contentReducer.galleryJeansPhoto
    })
}


export default connect(mapStateToProps, {})(FrontPageSale);
