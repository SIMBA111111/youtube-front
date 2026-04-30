const ME = {
    id: 'pldkfpolskf',
    name: 'Name',
    username: 'UserName',
    avatarUrl:'/testImages/pr.png'
}

export const getMe = async (jwt: string, meId: string) => {
    console.log('getMe');
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me/${meId}`, {
            headers: { 
                'Authorization': `Bearer ${jwt}` 
            },
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getMe non 200 status');
        }
    } catch (error) {
        new Error(`Error getMe: ${error}`);
        return []
    }
}