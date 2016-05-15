using System;
using System.Threading;
using Microsoft.Kinect.Tools;

// disable unreachable code warning
#pragma warning disable 0162

namespace KinectPlayback
{
    public class Playback
    {
        public void ReplayForever(String filePath)
        {
            try
            {
                using (KStudioClient client = KStudio.CreateClient())
                {
                    client.ConnectToService();
                    while (true)
                    {
                        KStudioPlayback playback = client.CreatePlayback(filePath);
                        playback.LoopCount = 0;
                        playback.Start();
                        while (playback.State == KStudioPlaybackState.Playing)
                        {
                            Thread.Sleep(33);
                        }
                    }
                    client.DisconnectFromService();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception caught: " + e.Message);
            }
        }

        static void Main(string[] args)
        {
            if (args.Length != 1)
            {
                Console.WriteLine("Please pass in a playback file.");
                System.Environment.Exit(0);
            }
            Playback playback = new Playback();
            playback.ReplayForever(args[0]);
        }
    }
}
