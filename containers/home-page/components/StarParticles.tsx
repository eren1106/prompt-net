'use client'

import { ReactNode, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars"
import { loadSlim } from '@tsparticles/slim';

interface StarParticlesProps {
  children: ReactNode;
}

const StarParticles = ({ children }: StarParticlesProps) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadStarsPreset(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // const particlesLoaded = (container: any) => {
  //   console.log(container);
  // };

  if (init) {
    return (
      <>
        <Particles
          id='star-particles'
          options={{
            preset: "stars",
            background: {
              color: {
                value: "",
              },
            },
            fullScreen: {
              enable: true,
              zIndex: -10
            },
          }}
        />
        {children}
      </>
    );
  }

  return children;
};

export default StarParticles;