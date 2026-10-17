import {existsSync, readFileSync, writeFileSync} from 'node:fs';
const name = process.argv[2];
if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) throw new Error('Use: npm run new:composition -- MyScene (PascalCase)');
const path = `src/compositions/${name}.tsx`;
const rootPath = 'src/Root.tsx';
const root = readFileSync(rootPath, 'utf8');
if (existsSync(path) || root.includes(`id="${name}"`)) throw new Error('Composition already exists');
if (!root.includes('{/* NEW_COMPOSITIONS */}')) throw new Error('Root registration marker missing');
writeFileSync(path, `import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedText} from '../components/AnimatedText';
import {palette} from '../config';
export const ${name} = () => {
 const frame = useCurrentFrame(); const {fps} = useVideoConfig();
 return <AbsoluteFill style={{background: palette.ink, color: palette.paper, justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial', fontSize: 100}}>
  <AnimatedText text="${name}"/><div style={{fontSize: 24}}>Time: {(frame / fps).toFixed(2)}s</div>
 </AbsoluteFill>;
};
`);
writeFileSync(rootPath, `import {${name}} from './compositions/${name}';
` + root.replace('{/* NEW_COMPOSITIONS */}', `<Composition id="${name}" component={${name}} width={video.width} height={video.height} fps={video.fps} durationInFrames={Math.round(video.fps*video.durationSeconds)}/>
 {/* NEW_COMPOSITIONS */}`));
console.log(`Created and registered ${name}. Select it in Studio.`);
