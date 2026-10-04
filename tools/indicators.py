"""Fact sheet from a JSON bar file. Measure only. No interpretation.

    python indicators.py TICKER [TICKER ...]

Reads bars_<TICKER>.json in the working directory: {"bars": [{time, open, high,
low, close, volume}, ...]} with time as a unix second. That is the shape the chart
platform hands back. See ../docs/05-technical-analysis.md.
"""
import json, datetime as D, statistics as st, sys
def load(t):
    s=open(f"bars_{t}.json",encoding="utf-8").read(); b=json.loads(s[s.find("{"):])["bars"]
    for x in b: x["d"]=D.datetime.utcfromtimestamp(x["time"]).date()
    return b
def ema(v,n):
    k=2/(n+1); e=[v[0]]
    for x in v[1:]: e.append(x*k+e[-1]*(1-k))
    return e
def rsi(c,n=14):
    g=[max(c[i]-c[i-1],0) for i in range(1,len(c))]; l=[max(c[i-1]-c[i],0) for i in range(1,len(c))]
    ag=sum(g[:n])/n; al=sum(l[:n])/n; out=[]
    for i in range(n,len(g)):
        ag=(ag*(n-1)+g[i])/n; al=(al*(n-1)+l[i])/n; out.append(100-100/(1+ag/al) if al else 100)
    return out
for t in (sys.argv[1:] or ["ACME"]):
    b=load(t); c=[x["close"] for x in b]; v=[x["volume"] for x in b]; last=b[-1]
    def ago(days):
        tgt=last["d"]-D.timedelta(days=days); cand=[x for x in b if x["d"]<=tgt]; return cand[-1]
    r=rsi(c); m=[a-bb for a,bb in zip(ema(c,12),ema(c,26))]; sig=ema(m,9)
    moves=sorted([((b[i]["close"]/b[i-1]["close"]-1)*100,str(b[i]["d"]),b[i]["volume"]/st.mean(v[i-21:i-1])) for i in range(len(b)-190,len(b))],key=lambda z:-abs(z[0]))[:8]
    months={}
    for x in b: months[(x["d"].year,x["d"].month)]=x["close"]
    print(t,"last",last["close"],last["d"])
    print(" ret 1m %.1f 3m %.1f 6m %.1f 12m %.1f (6m ago %s)"%((last["close"]/ago(30)["close"]-1)*100,(last["close"]/ago(91)["close"]-1)*100,(last["close"]/ago(182)["close"]-1)*100,(last["close"]/ago(365)["close"]-1)*100,ago(182)["close"]))
    print(" rsi %.1f macd %.1f sig %.1f  vs sma50 %.1f%% vs sma200 %.1f%%"%(r[-1],m[-1],sig[-1],(last["close"]/st.mean(c[-50:])-1)*100,(last["close"]/st.mean(c[-200:])-1)*100))
    print(" vol20/vol100 %.2f  avgvol20 %.0f"%(st.mean(v[-20:])/st.mean(v[-120:-20]), st.mean(v[-20:])))
    print(" 52w hi %s lo %s"%(max(x["high"] for x in b[-250:]), min(x["low"] for x in b[-250:])))
    print(" big moves:", [(round(a,1),d,round(vr,1)) for a,d,vr in moves])
    print(" monthly:", [(f"{y}-{mo:02d}",px) for (y,mo),px in list(months.items())[-14:]])
