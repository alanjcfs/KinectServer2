# KinectServer

What is this? This is the third re-write of a Kinect 2 server for Six Second Monks, optimized for speed and reliability.

# Installation

Requires Windows and Visual Studio Community 2015.

## Kinect 2.0 SDK

Install the Kinect 2.0 SDK. The current version is `v2.0_1409`.

## Boost

Compile boost with:

    bjam install --prefix=. --with-thread --with-system --with-date_time --with-regex link=static runtime-link=shared threading=multi

Make a static library:

    lib.exe /out:boost.lib lib/*

Move the resulting `boost.lib` to `KinectServer/lib`.

The current version of boost we are using is `1.60`.

## websocketpp

    git clone https://github.com/zaphoyd/websocketpp

The current version of websocketpp we are using is `0.7.0`.

## Finale

Make sure the include folders are set appropriately for both Boost and websocketpp in `KinectServer/KinectServer.vcxproj`.
