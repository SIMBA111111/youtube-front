import arrowDown from '../../../../public/svg/arrowDown.svg'
import arrowLeft from '../../../../public/svg/arrowLeft.svg'
import arrowUp from '../../../../public/svg/arrowUp.svg'
import award from '../../../../public/svg/award.svg'
import bell from '../../../../public/svg/bell.svg'
import broadcast from '../../../../public/svg/broadcast.svg'
import clock from '../../../../public/svg/clock.svg'
import comments from '../../../../public/svg/comments.svg'
import cross from '../../../../public/svg/cross.svg'
import crossedBell from '../../../../public/svg/crossedBell.svg'
import crossedEye from '../../../../public/svg/crossedEye.svg'
import dislike from '../../../../public/svg/dislike.svg'
import download from '../../../../public/svg/download.svg'
import flag from '../../../../public/svg/flag.svg'
import history from '../../../../public/svg/history.svg'
import home from '../../../../public/svg/home.svg'
import keyboard from '../../../../public/svg/keyboard.svg'
import like from '../../../../public/svg/like.svg'
import magnifier from '../../../../public/svg/magnifier.svg'
import movies from '../../../../public/svg/movies.svg'
import music from '../../../../public/svg/music.svg'
import myAccount from '../../../../public/svg/myAccount.svg'
import news from '../../../../public/svg/news.svg'
import playlist from '../../../../public/svg/playlist.svg'
import plus from '../../../../public/svg/plus.svg'
import settings from '../../../../public/svg/settings.svg'
import share from '../../../../public/svg/share.svg'
import shortArrowDown from '../../../../public/svg/shortArrowDown.svg'
import shortArrowLeft from '../../../../public/svg/shortArrowLeft.svg'
import shortArrowUp from '../../../../public/svg/shortArrowUp.svg'
import shorts from '../../../../public/svg/shorts.svg'
import subscriptions from '../../../../public/svg/subscriptions.svg'
import video from '../../../../public/svg/video.svg'
import verticalEllipsis from '../../../../public/svg/verticalEllipsis.svg'
import videogame from '../../../../public/svg/videogame.svg'
import burger from '../../../../public/svg/burger.svg'
import mainLogo from '../../../../public/svg/mainLogo.svg'
import micro from '../../../../public/svg/micro.svg'
import writing from '../../../../public/svg/writing.svg'

import { svgs } from "@/shared/constants/svgs"
import { log } from 'console'

const sizes = {
    small: 16,
    middle: 24,
    big: 32,
}

interface ISvg {
    name: keyof typeof svgs
    size?: keyof typeof sizes
}

export const Svg: React.FC<ISvg> = ({
    name, 
    size='middle'
}) => {

    switch (name) {
        case 'arrowDown':
            return <img src={arrowDown.src} height={sizes[size]}/> 

        case 'arrowLeft':
            return <img src={arrowLeft.src} height={sizes[size]}/> 

        case 'arrowUp':
            return <img src={arrowUp.src} height={sizes[size]}/> 

        case 'award':
            return <img src={award.src} height={sizes[size]}/> 

        case 'bell': 
            return <img src={bell.src} height={sizes[size]}/> 

        case 'broadcast': 
            return <img src={broadcast.src} height={sizes[size]}/> 
        
        case 'clock':
            return <img src={clock.src} height={sizes[size]}/> 

        case 'comments':
            return <img src={comments.src} height={sizes[size]}/> 
        
        case 'cross':
            return <img src={cross.src }height={sizes[size]}/> 

        case 'crossedBell':
            return <img src={crossedBell.src }height={sizes[size]}/> 

        case 'crossedEye':
            return <img src={crossedEye.src }height={sizes[size]}/> 

        case 'dislike':
            return <img src={dislike.src} height={sizes[size]}/> 

        case 'download':
            return <img src={download.src} height={sizes[size]}/> 

        case 'flag':
            return <img src={flag.src} height={sizes[size]}/> 

        case 'history':
            return <img src={history.src} height={sizes[size]}/> 

        case 'home':
            return <img src={home.src} height={sizes[size]}/> 

        case 'keyboard':
            return <img src={keyboard.src} height={sizes[size]}/> 
        
        case 'like':
            return <img src={like.src} height={sizes[size]}/> 

        case 'magnifier':
            return <img src={magnifier.src} height={sizes[size]}/> 

        case 'movies':
            return <img src={movies.src} height={sizes[size]}/> 

        case 'music':
            return <img src={music.src} height={sizes[size]}/> 

        case 'myAccount':
            return <img src={myAccount.src} height={sizes[size]}/> 

        case 'news':
            return <img src={news.src} height={sizes[size]}/> 

        case 'playlist':
            return <img src={playlist.src} height={sizes[size]}/> 

        case 'plus':
            return <img src={plus.src} height={sizes[size]}/> 

        case 'settings':
            return <img src={settings.src} height={sizes[size]}/> 

        case 'share':
            return <img src={share.src} height={sizes[size]}/>

        case 'shortArrowDown':
            return <img src={shortArrowDown.src} height={sizes[size]}/> 

        case 'shortArrowLeft':
            return <img src={shortArrowLeft.src} height={sizes[size]}/> 

        case 'shortArrowUp':
            return <img src={shortArrowUp.src} height={sizes[size]}/> 

        case 'shorts':
            return <img src={shorts.src} height={sizes[size]}/> 

        case 'subscriptions':
            return <img src={subscriptions.src} height={sizes[size]}/> 

        case 'video':
            return <img src={video.src} height={sizes[size]}/> 
            
        case 'verticalEllipsis':
            return <img src={verticalEllipsis.src} height={sizes[size]}/> 

        case 'videogame':
            return <img src={videogame.src} height={sizes[size]}/> 
    
        case 'burger':
            return <img src={burger.src} height={sizes[size]}/> 
    
        case 'mainLogo':
            return <img src={mainLogo.src} height={sizes[size]}/>

        case 'micro':
            return <img src={micro.src} height={sizes[size]}/>

        case 'writing':
            return <img src={writing.src} height={sizes[size]}/>

        default:
            break;
    }
}