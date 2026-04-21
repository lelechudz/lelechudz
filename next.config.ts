import type { NextConfig } from "next";

const shaderLoader = {
  loaders: ["raw-loader", "glslify-loader"],
  as: "*.js",
};

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ["three"],
  turbopack: {
    rules: {
      "*.glsl": shaderLoader,
      "*.vs": shaderLoader,
      "*.fs": shaderLoader,
      "*.vert": shaderLoader,
      "*.frag": shaderLoader,
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });
    return config;
  },
};

export default nextConfig;
