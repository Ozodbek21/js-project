window.addEventListener('DOMContentLoaded', function(){
    const api = {
        key: 'd4e215cc2471503c8db2ea0024d7814d',
        baseurl: 'https://api.openweathermap.org/data/2.5/',
        defaultTown: 'toshkent',
        nomozVaqtlari: ' https://islomapi.uz/api/present/day?region=Toshkent'
    }
    
    const search = document.querySelector('.search');
    search.addEventListener("keypress", searchFunc)
    
    function searchFunc(e) {
        if (e.keyCode == 13) {
            getResults(search.value);
            console.log(search.value);
        }
    }
    
    getResults()
    
    function getResults(query) {
    
        fetch(`${api.baseurl}weather?q=${query || api.defaultTown}&units=metric&APPID=${api.key}`)
            .then((weather) => {
                return weather.json()
            })
            .then(displayResults)
    
    }
    
    function displayResults(weather) {
        console.log(weather);
        let city = document.querySelector('.city')
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    
    
        let temp = document.querySelector('.temp')
        temp.innerHTML = `${Math.round(weather.main.temp)} °C`;
    
        let weatherEl = document.querySelector('.weather')
        weatherEl.innerHTML = weather.weather[0].main;
    
    
        let hiLow = document.querySelector('.hiLow')
        hiLow.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`
    
        let obHavo = document.querySelector('.obHavo')
        obHavo.innerHTML = `${Math.round(weather.main.temp)}°C`;
    }
    
    function dateBuilder(o) {
        let mounths = ['Yanvar', 'Febral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',]
    
        let days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba',]
    
        let day = days[o.getDay()]
        let date = o.getDate()
        let mounth = mounths[o.getMonth()]
        let year = o.getFullYear() + ' yil'
    
        return `${day} ${date} ${mounth} ${year}`
    }
    
    let now = new Date();
    let date = document.querySelector('.date')
    date.innerHTML = dateBuilder(now)
    
    function vaqt() {
        fetch(`${api.clock}`)
            .then((javobim) => {
                return javobim
            })
            .then(hozirgiVaqt)
    }
    
    function hozirgiVaqt(javobim) {
        console.log(javobim);
        let vaqt = document.querySelector('.vaqt')
        vaqt.innerHTML = `${javobim.datetime}`
    }
    
    nomozVaqti()
    
    function nomozVaqti() {
    
        fetch(`${api.nomozVaqtlari}`)
            .then((javob) => {
                return javob.json()
            })
            .then(toshkentVaqti)
    
    }
    
    
    function toshkentVaqti(javob) {
        console.log(javob);
    
        let Tong = document.querySelector('.Tong')
        Tong.innerHTML = `${javob.times.tong_saharlik}`
    
        let Quyosh = document.querySelector('.Quyosh')
        Quyosh.innerHTML = `${javob.times.quyosh}`
    
        let Peshin = document.querySelector('.Peshin')
        Peshin.innerHTML = `${javob.times.peshin}`
    
        let asr = document.querySelector('.Asr')
        asr.innerHTML = `${javob.times.asr}`
    
        let Shom = document.querySelector('.Shom')
        Shom.innerHTML = `${javob.times.shom_iftor}`
    
        let Xufton = document.querySelector('.Xufton')
        Xufton.innerHTML = `${javob.times.hufton}`
    
    
    
        setInterval(() => {
            let soat = document.querySelector('.soat')
            let sana = document.querySelector('.sana')
            let dataTime = new Date()
            let hrs = dataTime.getHours()
            let min = dataTime.getMinutes()
            let sec = dataTime.getSeconds()
    
            if (hrs < 10) {
                hrs = '0' + hrs
            }
            if (min < 10) {
                min = '0' + min
            }
            if (sec < 10) {
                sec = '0' + sec
            }
            sana.innerHTML = `${javob.date}`
            soat.innerHTML = `${hrs} : ${min} : ${sec}`
    
        })
    }
    
    
    let option = {
        strings: ['Nomoz vaqtlari Toshkent'],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        loopCount: Infinity,
    };
    
    let typed = new Typed('.typed', option);
    
    let options = {
        strings: ["Ob-Havo Ma'lumotlari"],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true,
        loopCount: Infinity,
    };
    
    let typedText = new Typed('.typedText', options);
    
    window.addEventListener('scroll', function () {
        let header = document.querySelector('.header');
        header.classList.toggle("sticky", window.scrollY > 0)
    })
    
    
    let bars = document.querySelector('.bars')
    let links = document.querySelector('.links')
    
    bars.addEventListener('click', function(){
        bars.classList.toggle('toggle')
        links.classList.toggle('active')
    })
    
    iconR = (icon) => icon.classList.toggle("fa-xmark")
})