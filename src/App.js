import { useEffect } from 'react';
import Home from './Components/home/Home';

function App() {
  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      const scrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
      };
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
    };

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Restore the scroll positions when the component mounts
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const scrollPosition = JSON.parse(savedScrollPosition);
      window.scrollTo(scrollPosition.x, scrollPosition.y);
    }
  }, []);

  return (
    <>
    <Home/>
    </>
  );
}

export default App;
