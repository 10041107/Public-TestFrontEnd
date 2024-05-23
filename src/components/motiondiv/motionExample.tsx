import AnimatedContainer from "./AnimatedContainer"


export const MotionExample = () => {
  return (
    <div>

    <div className="flex gap-x-2">

    <AnimatedContainer type="fadeInSlower">
    <button className="btn btn-grey">fadeInSlower</button>
    </AnimatedContainer>
    
    <AnimatedContainer type="fadeInSlow">
    <button className="btn btn-grey">fadeInSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="fadeIn">
    <button className="btn btn-grey">fadeIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="fadeInFast">
    <button className="btn btn-grey">fadeInFast</button>
    </AnimatedContainer>

    <AnimatedContainer type="fadeInFaster">
    <button className="btn btn-grey">fadeInFaster</button>
    </AnimatedContainer>

    <AnimatedContainer type="zoomInSlow">
    <button className="btn btn-grey">zoomInSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="zoomIn">
    <button className="btn btn-grey">zoomIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="zoomInFast">
    <button className="btn btn-grey">zoomInFast</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomInSlow">
    <button className="btn btn-grey">powerZoomInSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomIn">
    <button className="btn btn-grey">powerZoomIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomInFast">
    <button className="btn btn-grey">powerZoomInFast</button>
    </AnimatedContainer>
    </div>



    <div className="flex gap-x-2">

    <AnimatedContainer type="slideUpSlower">
    <button className="btn btn-grey">slideUpSlower</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideUpSlow">
    <button className="btn btn-grey">slideUpSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideUp">
    <button className="btn btn-grey">slideUp</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideUpFast">
    <button className="btn btn-grey">slideUpFast</button>
    </AnimatedContainer>
    
    <AnimatedContainer type="slideUpFaster">
    <button className="btn btn-grey">slideUpFaster</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideDownSlower">
    <button className="btn btn-grey">slideDownSlower</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideDownSlow">
    <button className="btn btn-grey">slideDownSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideDown">
    <button className="btn btn-grey">slideDown</button>
    </AnimatedContainer>

    <AnimatedContainer type="slideDownFast">
    <button className="btn btn-grey">slideDownFast</button>
    </AnimatedContainer>
    
    <AnimatedContainer type="slideDownFaster">
    <button className="btn btn-grey">slideDownFaster</button>
    </AnimatedContainer>

    </div>




    <div className="flex gap-x-2">

    <AnimatedContainer type="zoomOutSlow">
    <button className="btn btn-grey">zoomOutSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="zoomOut">
    <button className="btn btn-grey">zoomOut</button>
    </AnimatedContainer>

    <AnimatedContainer type="zoomOutFast">
    <button className="btn btn-grey">zoomOutFast</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomOutSlow">
    <button className="btn btn-grey">powerZoomOutSlow</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomOut">
    <button className="btn btn-grey">powerZoomOut</button>
    </AnimatedContainer>

    <AnimatedContainer type="powerZoomOutFast">
    <button className="btn btn-grey">powerZoomOutFast</button>
    </AnimatedContainer>

    </div>



    <div className="flex gap-x-2">

    <AnimatedContainer type="swingFast">
    <button className="btn btn-grey">swingFast</button>
    </AnimatedContainer>

    <AnimatedContainer type="swingRebound">
    <button className="btn btn-grey">swingRebound</button>
    </AnimatedContainer>

    <AnimatedContainer type="swingPower">
    <button className="btn btn-grey">swingPower</button>
    </AnimatedContainer>

    <AnimatedContainer type="VibrationSmall">
    <button className="btn btn-grey">VibrationSmall</button>
    </AnimatedContainer>

    <AnimatedContainer type="Vibration">
    <button className="btn btn-grey">Vibration</button>
    </AnimatedContainer>

    <AnimatedContainer type="VibrationPower">
    <button className="btn btn-grey">VibrationPower</button>
    </AnimatedContainer>

    <AnimatedContainer type="VibrationStrong">
    <button className="btn btn-grey">VibrationStrong</button>
    </AnimatedContainer>
    
    </div>



    <div className="flex gap-x-2">

    <AnimatedContainer type="bounceIn">
    <button className="btn btn-grey">bounceIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="softBounceIn">
    <button className="btn btn-grey">softBounceIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="strongBounceIn">
    <button className="btn btn-grey">strongBounceIn</button>
    </AnimatedContainer>

    <AnimatedContainer type="bounceInLeft">
    <button className="btn btn-grey">bounceInLeft</button>
    </AnimatedContainer>

    <AnimatedContainer type="bounceInRight">
    <button className="btn btn-grey">bounceInRight</button>
    </AnimatedContainer>

    <AnimatedContainer type="bounceInUp">
    <button className="btn btn-grey">bounceInUp</button>
    </AnimatedContainer>

    <AnimatedContainer type="bounceInDown">
    <button className="btn btn-grey">bounceInDown</button>
    </AnimatedContainer>
    
    <AnimatedContainer type="bounceInNoOpacity">
    <button className="btn btn-grey">bounceInNoOpacity</button>
    </AnimatedContainer>

    <AnimatedContainer type="fastBounceIn">
    <button className="btn btn-grey">fastBounceIn</button>
    </AnimatedContainer>


    <AnimatedContainer type="rotateBounceIn">
    <button className="btn btn-grey">rotateBounceIn</button>
    </AnimatedContainer>

    </div>




   </div>
  );
};