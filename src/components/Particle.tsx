import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleConfig from "../config/particleConfig";

const Particle: React.FC<{}> = () => {
    const particlesInit = useCallback((engine: any) => {
        loadFull(engine);
    }, []) as any;
    return <Particles init={particlesInit} options={particleConfig} />
};

export default Particle;
