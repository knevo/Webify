import GenericText from './cmps/GenericText';
import Img from './cmps/Img';
import Button from './cmps/Button';
import GenericSection from './cmps/GenericSection';
import Navbar from './cmps/Navbar';
import Footer from './cmps/Footer';
import Cards from './cmps/ready-cmps/Cards';
import Card from './cmps/ready-cmps/Card';
import Header from './cmps/ready-cmps/Header';
import Youtube from './cmps/Youtube';
import gMap from './cmps/gMap';
import SocialButtons from './cmps/SocialButtons'
import ContactForm from './cmps/ready-cmps/ContactForm'

const cmps = {
    VerticalSection: () => GenericSection('vertical'),
    GenericText,
    GenericSection,
    Img,
    Button,
    Cards,
    Card,
    Header,
    Navbar,
    Footer,
    Youtube,
    gMap,
    SocialButtons,
    ContactForm
};

export default cmps;