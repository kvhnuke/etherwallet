  <table class="table table-striped" style="margin: 2em auto;">
    <tr>
      <td>Name:  </td>
      <td class="mono"><a href="https://etherscan.io/enslookup?q={{objENS.name}}{{objENS.tld}}" target="_blank" rel="noopener">{{objENS.name}}{{objENS.tld}}</a></td>
    </tr>
    <tr>
      <td>Labelhash ({{objENS.name}}): </td>
      <td class="mono">{{objENS.nameSHA3}}</td>
    </tr>
    <tr>
      <td>Namehash ({{objENS.name}}{{objENS.tld}}): </td>
      <td class="mono">{{objENS.namehash}}</td>
    </tr>
    <tr>
      <td>Owner:</td>
      <td class="mono">{{objENS.owner}}</td>
    </tr>
    <tr>
      <td>Highest Bidder (Deed Owner): </td>
      <td><span class="mono">{{objENS.deedOwner}}</span></td>
    </tr>
    <tr>
      <td>Resolved Address: </td>
      <td class="mono">{{objENS.resolvedAddress}}</td>
    </tr>
  </table>
