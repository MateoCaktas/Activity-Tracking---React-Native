export const imageType = (type) => {
    switch(type){
        case 'Music':
            return require('../assets/Activities/Music.jpg');
        case 'Sport':
            return require('../assets/Activities/sports.png');
    }
}

export const iconType = (type) => {
    switch(type){
        case 'Music':
            return require('../assets/Activities/music-icon.png');
        case 'Sport':
            return require('../assets/Activities/team-sport.png');
    }
}