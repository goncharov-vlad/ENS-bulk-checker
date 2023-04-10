# ENS Bulk Checker
![CodeStyle](https://img.shields.io/static/v1?label=code%20style&message=Airbnb&color=red&style=for-the-badge&logo=appveyor)
![License](https://img.shields.io/github/license/goncharov-vlad/spa-router?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

The ENS Name Bulk Checker is a command-line tool that allows you efficiently monitor the availability of many Ethereum Name Service (ENS) names simultaneously. With this tool, you can easily monitor the availability of a large list of ENS names, which can save you time and effort when trying to find a domain name that suits your needs

## What is Ethereum Name Service (ENS)?
[The Ethereum Name Service (ENS)](https://app.ens.domains/) is a decentralized system that allows users to register human-readable names (like "myname.eth") that can be used in place of long and complex Ethereum addresses. This makes it easier for people to send cryptocurrency, interact with decentralized applications, and establish a brand identity on the Ethereum blockchain. ENS is built on top of the Ethereum blockchain and uses smart contracts to securely manage and resolve names to the corresponding Ethereum addresses

They can be resold, repurchased, or registered directly for market speculation or personal use

## The Tool Benefits
In contrast with already existing web tools, this bulk checker tool works correctly and also provides several benefits for users who want to efficiently manage their ENS names

- It pulls data directly from Ethereum Blockchain (several ENS smart contracts) so you can be sure all data is always fresh
- It's easy to use as it has not many simple and clear commands
- Shows you all the necessary information about your name like last price, status, **expiration date including the grace period**, quick link to buy 
- Scanned names are always sorted. First you see ready-to-buy, free names, and then you see those that are closest to the expiration date
- It's easy to manage a large list that includes thousands of names
- It provides the ability to mark special names you like as favorite ones

## Pre-requirements
1. **Node.js 18+**
2. Add your Ethereum RPC node URL to the `.ens` file (see `example.env`). The speed of name looking will depend on the node you use
3. Run `npm run build` to build 
4. Run `npm run start` and it will give you the welcome output similar bellow
```
> start
> node build/index.js

Welcome to The ENS Bulk Checker!
Homepage: https://github.com/goncharov-vlad/ens-bulk-checker

Commands:
scan        Check all your ENS names in the file ./resource/name.txt (add names without the .eth suffix)
print       Show information about your ENS names that have been checked/scanned previously (data saved in the file ./resource/scanResult.json)
help        Display this message
```
## Using
Let's scan the first bulk of names. First, as the `scan` command says, we need to place our names in the file `./resource/name.txt` 

```
# ./resource/name.txt

giantbrain
bigbrain
hugebrain
cryptohero
sony
bigbomb
hugebomb
etherking
crazyking
badking
```

Now, let's check them by running `npm run start -- scan`. The next output will come

```
> start
> node build/index.js scan

Names count: 10

1/10 | success | giantbrain
2/10 | success | bigbrain
3/10 | success | hugebrain
4/10 | success | cryptohero
5/10 | success | sony
6/10 | success | bigbomb
7/10 | success | hugebomb
8/10 | success | etherking
9/10 | success | crazyking
10/10 | success | badking
Saving...
```

Time to see information about the names. Run `npm run start -- print`

```
> start
> node build/index.js print

Favorite names: 0
NOTE: You can save your favorite names in the file ./resource/favoriteName.txt

Other ENS names: 10
┌────┬────────────┬─────────────┬───────────────────┬──────────────────────────────────────────────────────┐
│ #  │ Name       │ Last Price  │ Expires           │ Link                                                 │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 1  │ giantbrain │ 0.08630685  │ free              │ https://app.ens.domains/name/giantbrain.eth/register │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 2  │ hugebomb   │ 0.08630685  │ free              │ https://app.ens.domains/name/hugebomb.eth/register   │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 3  │ badking    │ 0.08630685  │ 13 Aug 2023 15:00 │ https://app.ens.domains/name/badking.eth/register    │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 4  │ crazyking  │ 0.08630685  │ 09 Sep 2023 12:12 │ https://app.ens.domains/name/crazyking.eth/register  │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 5  │ bigbomb    │ 0.08630685  │ 10 Nov 2023 20:36 │ https://app.ens.domains/name/bigbomb.eth/register    │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 6  │ hugebrain  │ 0.08630685  │ 06 Aug 2024 11:11 │ https://app.ens.domains/name/hugebrain.eth/register  │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 7  │ etherking  │ 0.08630685  │ 16 Oct 2024 00:33 │ https://app.ens.domains/name/etherking.eth/register  │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 8  │ bigbrain   │ 0.08630685  │ 04 May 2031 16:01 │ https://app.ens.domains/name/bigbrain.eth/register   │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 9  │ cryptohero │ 0.08630685  │ 02 Jun 2031 20:04 │ https://app.ens.domains/name/cryptohero.eth/register │
├────┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 10 │ sony       │ 2.761819219 │ 20 Oct 2041 01:16 │ https://app.ens.domains/name/sony.eth/register       │
└────┴────────────┴─────────────┴───────────────────┴──────────────────────────────────────────────────────┘
```
As you can see the table is sorted and the free names are listed first and then the others are listed in expiration order. The previous output says that you can also mark your favorite names by putting them in the `./resource/favoriteName.txt` file. For example, let's add `badking` and `crazyking` to your favorites so we can monitor the expiration date coming up more convenient and we will be ready to buy before anyone else
```
# ./resource/favoriteName.txt

badking
crazyking
```

Now let's see the table again by runnig `npm run start -- print`
```
> start
> node build/index.js print

Favorite names: 2
┌───┬───────────┬────────────┬───────────────────┬─────────────────────────────────────────────────────┐
│ # │ Name      │ Last Price │ Expires           │ Link                                                │
├───┼───────────┼────────────┼───────────────────┼─────────────────────────────────────────────────────┤
│ 1 │ badking   │ 0.08630685 │ 13 Aug 2023 15:00 │ https://app.ens.domains/name/badking.eth/register   │
├───┼───────────┼────────────┼───────────────────┼─────────────────────────────────────────────────────┤
│ 2 │ crazyking │ 0.08630685 │ 09 Sep 2023 12:12 │ https://app.ens.domains/name/crazyking.eth/register │
└───┴───────────┴────────────┴───────────────────┴─────────────────────────────────────────────────────┘
NOTE: You can save your favorite names in the file ./resource/favoriteName.txt

Other ENS names: 8
┌───┬────────────┬─────────────┬───────────────────┬──────────────────────────────────────────────────────┐
│ # │ Name       │ Last Price  │ Expires           │ Link                                                 │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 1 │ giantbrain │ 0.08630685  │ free              │ https://app.ens.domains/name/giantbrain.eth/register │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 2 │ hugebomb   │ 0.08630685  │ free              │ https://app.ens.domains/name/hugebomb.eth/register   │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 3 │ bigbomb    │ 0.08630685  │ 10 Nov 2023 20:36 │ https://app.ens.domains/name/bigbomb.eth/register    │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 4 │ hugebrain  │ 0.08630685  │ 06 Aug 2024 11:11 │ https://app.ens.domains/name/hugebrain.eth/register  │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 5 │ etherking  │ 0.08630685  │ 16 Oct 2024 00:33 │ https://app.ens.domains/name/etherking.eth/register  │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 6 │ bigbrain   │ 0.08630685  │ 04 May 2031 16:01 │ https://app.ens.domains/name/bigbrain.eth/register   │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 7 │ cryptohero │ 0.08630685  │ 02 Jun 2031 20:04 │ https://app.ens.domains/name/cryptohero.eth/register │
├───┼────────────┼─────────────┼───────────────────┼──────────────────────────────────────────────────────┤
│ 8 │ sony       │ 2.761819219 │ 20 Oct 2041 01:16 │ https://app.ens.domains/name/sony.eth/register       │
└───┴────────────┴─────────────┴───────────────────┴──────────────────────────────────────────────────────┘
```

`badking` and `crazyking` are moved to the separate top table which you always see before the main table. To move items back to the main table from the favorite one just remove those items from the favorite names file `./resource/favoriteName.txt`

**To scan for new names**, simply add them to the rest of the names and run `npm run start --scan` as you did before. The command will not only scan for recently added names, but it will also update information on old ones you are tracking

Since ENS implemented ERC-721 you can see the names as NFTs on the most popular NFT marketplaces ([looksrare](https://looksrare.org/), [rarible](https://rarible.com/), [opensea](https://opensea.io/)). By the way, I managed to grab a couple of nice names: `tabulation.eth`, `rockyman.eth`, and my favorite `crazyduck.eth` 

\\^,^/
