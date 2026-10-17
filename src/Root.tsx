import {Composition} from 'remotion';
import {VividScales} from './compositions/VividScales';
import {video} from './config';
import {VividScalesLaunch} from './compositions/vividscales-launch/VividScalesLaunch';
import {launch} from './compositions/vividscales-launch/design';
import {VividScalesAd} from './compositions/vividscales-ad/VividScalesAd';
import {ad} from './compositions/vividscales-ad/design';
import {OpeningV2,openingV2} from './compositions/vividscales-opening-v2/OpeningV2';
export const RemotionRoot = () => <>
 <Composition id="VividScales" component={VividScales} width={video.width} height={video.height} fps={video.fps} durationInFrames={Math.round(video.fps*video.durationSeconds)}/>
 <Composition id="VividScalesLaunch" component={VividScalesLaunch} {...launch}/>
 <Composition id="VividScalesAd" component={VividScalesAd} {...ad}/>
 <Composition id="VividScalesOpeningV2" component={OpeningV2} {...openingV2}/>
 {/* NEW_COMPOSITIONS */}
</>;
