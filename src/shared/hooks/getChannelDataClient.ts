import Cookies from 'js-cookie'
import { IChannelData } from '../utils/getChannelData'

export const getChannelDataClient = (): IChannelData | null => {
    const channelData = Cookies.get('channelData')
    return channelData ? JSON.parse(channelData) : null
}