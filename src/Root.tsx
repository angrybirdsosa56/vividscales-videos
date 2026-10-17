import {Composition} from 'remotion';
import {VividScales} from './compositions/VividScales';
import {video} from './config';
import {VividScalesLaunch} from './compositions/vividscales-launch/VividScalesLaunch';
import {launch} from './compositions/vividscales-launch/design';
import {VividScalesAd} from './compositions/vividscales-ad/VividScalesAd';
import {ad} from './compositions/vividscales-ad/design';
export const RemotionRoot = () => <>
 <Composition id="VividScales" component={VividScales} width={video.width} height={video.height} fps={video.fps} durationInFrames={Math.round(video.fps*video.durationSeconds)}/>
 <Composition id="VividScalesLaunch" component={VividScalesLaunch} {...launch}/>
 <Composition id="VividScalesAd" component={VividScalesAd} {...ad}/>
 {/* NEW_COMPOSITIONS */}
</>;
