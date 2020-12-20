import Card from './Card';

export default () => {
    return {
        cmpName: 'Cards Section',
        htmlTagName: 'section',
        role: 'section',
        prefs: {
            style: {
                flexDirection: 'row',
                padding: '12px'
            }
        },
        children: getCards(4)
    };
};

function getCards(amount) {
    let cards = []
    for (let i = 0; i < amount; i++) {
        cards.push(Card());
    }
    return cards;
}

