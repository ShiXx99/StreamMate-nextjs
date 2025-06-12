export default function IntroAnimation() {
  return (
    <div id="intro" style={{
      position:'fixed', top:0, left:0, width:'100%', height:'100%',
      background:'#000', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999
    }}>
      <h1 style={{fontSize:'64px', letterSpacing:'4px', color:'#e50914', animation:'introAnim 2s forwards'}}>
        STREAMMATE
      </h1>
      <style jsx>{`
        @keyframes introAnim {
          0% { transform: translateY(-100px) scale(0.5); opacity: 0; }
          50% { transform: translateY(0) scale(1.2); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
