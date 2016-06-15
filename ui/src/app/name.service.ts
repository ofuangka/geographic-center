import { Injectable } from '@angular/core';

@Injectable()
export class NameService {

    constructor() { }
    getRandom() {
        let adjectiveIndex = Math.floor(Math.random() * 100) % ADJECTIVES.length,
            nounIndex = Math.floor(Math.random() * 100) % NOUNS.length;
        return `${ADJECTIVES[adjectiveIndex]} ${NOUNS[nounIndex]}`;
    }
}
var ADJECTIVES = [
    'Awesome',
    'Able',
    'Beautiful',
    'Bountiful',
    'Careful',
    'Cross',
    'Delicate',
    'Devious',
    'Ecstatic',
    'Evolutionary',
    'Famous',
    'Forlorn',
    'Grateful',
    'Genial',
    'Hilarious',
    'Heroic',
    'Idiosyncratic',
    'Ignoble',
    'Joyful',
    'Jovial',
    'Kindhearted',
    'Loving',
    'Lawyerly',
    'Magnanimous',
    'Maniacal',
    'Neoprene',
    'Nascent',
    'Obvious',
    'Outlandish',
    'Panicking',
    'Poor',
    'Quarterly',
    'Queer',
    'Reclusive',
    'Randy',
    'Stately',
    'Slithering',
    'Tough',
    'Tepid',
    'Underwhelming',
    'Ultimate',
    'Vexxing',
    'Valuable',
    'Welsh',
    'White',
    'Xenophobic',
    'Yellow',
    'Yodeling',
    'Zero-sum'
]
var NOUNS = [
    'albatross',
    'aura',
    'boss',
    'bell',
    'cake',
    'cross',
    'duck',
    'damsel',
    'earthworm',
    'eagle',
    'falcon',
    'falchion',
    'gorilla',
    'goat',
    'helper',
    'hexagon',
    'isthmus',
    'igloo',
    'jamboree',
    'jello',
    'kangaroo',
    'kroner',
    'land',
    'lettuce',
    'mortgage',
    'mortuary',
    'nest',
    'nematode',
    'octopus',
    'orangutan',
    'paleontologist',
    'pacifier',
    'queen',
    'quicksilver',
    'raisin',
    'ranger',
    'singer',
    'sanctuary',
    'toga',
    'tapdancer',
    'udder',
    'umpire',
    'vandal',
    'vole',
    'whale',
    'wolverine',
    'xylophone',
    'yak',
    'yam',
    'zebra',
    'zoologist'
];