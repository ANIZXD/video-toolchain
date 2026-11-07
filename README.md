# Video toolchain

Installed 2026-11-07 for OpenCode. Root: `C:\Users\ay660\Tools\video`.

## Installed

| Tool | Version | Install path | Test result |
|---|---|---|---|
| FFmpeg / ffprobe | 9.0.2 essentials | `Tools\video\ffmpeg\ffmpeg-9.0.2-essentials_build\bin` | H.264 + AAC render, burned ASS subtitle, frame inspected |
| yt-dlp | 2026.10.26 | `Tools\video\yt-dlp\yt-dlp.exe` | Live YouTube metadata + 240p video/audio download, merged to MP4 |
| whisper.cpp | 1.9.5 (b5454) | `Tools\video\whisper\Release` | Transcribed a real SAPI speech sample exactly, 1.9 s for 8 s audio |
| Remotion | 4.0.541 | `Tools\video\remotion-demo` | Rendered 90 frames, 1920x1080, 30 fps, H.264 |
| HyperFrames | 0.9.19 | `Tools\video\hyperframes\demo` | `check` 0 errors / 0 warnings; rendered 180 frames, 6 s, 1080p |

Node 24.21.0 · npm 11.19.0 · Python 3.12.10

## Use it

```powershell
ffmpeg -version
ffprobe -version
yt-dlp --version
whisper-cli --version
```

If a shell cannot see them, load the session path:

```powershell
. C:\Users\ay660\Tools\video\use-video-tools.ps1
```

### Remotion

```powershell
cd C:\Users\ay660\Tools\video\remotion-demo
npx remotion studio
npx remotion render Test out/test.mp4
```

Test output: `remotion-demo\out\test.mp4` (3 s, 1920x1080, 30 fps).

### HyperFrames

```powershell
cd C:\Users\ay660\Tools\video\hyperframes\demo
npx hyperframes preview
npx hyperframes check
npx hyperframes render --workers=1 --output renders/test.mp4
```

Test output: `hyperframes\demo\renders\test.mp4` (6 s, 1920x1080, 30 fps).
The 6-second composition is in `index.html`; it uses a GSAP timeline.

The HyperFrames agent skills are installed at:

- `C:\Users\ay660\.config\opencode\skills\hyperframes`
- `...\hyperframes-cli`
- `...\hyperframes-registry`
- `...\media-use`

They are also in `C:\Users\ay660\.claude\skills` for Claude Code.

### whisper.cpp

```powershell
whisper-cli -m C:\Users\ay660\Tools\video\whisper\models\ggml-tiny.en.bin `
  -f audio.wav -otxt -of transcript
```

Model: `ggml-tiny.en.bin` (77.7 MB). For better accuracy, download
`ggml-base.en.bin` or `ggml-small.en.bin` from
`https://huggingface.co/ggerganov/whisper.cpp/tree/main` into
`Tools\video\whisper\models`.

Test transcript: `Tools\video\whisper\test-speech.txt`.

### yt-dlp

```powershell
yt-dlp -x --audio-format mp3 "URL"
yt-dlp -f "bv*+ba/b" --merge-output-format mp4 "URL"
```

Only download media you have the right to use.

## PATH notes

The user PATH now includes the FFmpeg bin, yt-dlp folder and whisper Release
folder. For the current OpenCode session, standalone copies of
`ffmpeg.exe`, `ffprobe.exe` and `yt-dlp.exe` also live in
`C:\Users\ay660\.local\bin` (already on PATH). `whisper-cli.cmd` there is a
wrapper, because whisper.cpp needs its DLLs from the Release folder.

Do not replace the `.local\bin` `ffmpeg.exe` with a `.cmd` wrapper:
HyperFrames spawns FFmpeg directly and fails with `EINVAL` on wrappers.

## Updating

```powershell
# yt-dlp standalone
yt-dlp -U

# Remotion
cd C:\Users\ay660\Tools\video\remotion-demo
npm update remotion @remotion/cli
```

FFmpeg and whisper.cpp are manual replacements from their release pages.
HyperFrames updates through `npx hyperframes@latest` and
`npx hyperframes skills update`.
