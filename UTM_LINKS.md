# UTM-tagged links to chicagofirewatch.com

Use these when posting about the webcam so traffic is attributable in analytics.

| Platform | Link |
|---|---|
| youtube | https://www.chicagofirewatch.com/?utm_source=youtube&utm_medium=social&utm_campaign=webcam_awareness |
| instagram | https://www.chicagofirewatch.com/?utm_source=instagram&utm_medium=social&utm_campaign=webcam_awareness |
| x | https://www.chicagofirewatch.com/?utm_source=x&utm_medium=social&utm_campaign=webcam_awareness |
| reddit | https://www.chicagofirewatch.com/?utm_source=reddit&utm_medium=social&utm_campaign=webcam_awareness |
| tiktok | https://www.chicagofirewatch.com/?utm_source=tiktok&utm_medium=social&utm_campaign=webcam_awareness |
| threads | https://www.chicagofirewatch.com/?utm_source=threads&utm_medium=social&utm_campaign=webcam_awareness |

On-site outbound YouTube links use `utm_source=chicagofirewatch&utm_medium=website&utm_campaign=webcam_awareness` (see `src/lib/utm.ts`; not applied to the iframe embed).

Outbound YouTube destinations use the channel handle (the iframe embed still uses the channel ID, as `live_stream?channel=` requires it):

| Link | URL (before UTM) |
|---|---|
| Live | https://www.youtube.com/@ChicagoFireWatch/live |
| Channel / footer | https://www.youtube.com/@ChicagoFireWatch |
| Replays | https://www.youtube.com/@ChicagoFireWatch/videos |
| Subscribe | https://www.youtube.com/@ChicagoFireWatch?sub_confirmation=1 |
