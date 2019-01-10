pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public { // minimum contribution for the constructor is required
        address newCampaign = new Campaign(minimum, msg.sender); // when a new campaign is deployed the address is generated
                                                                    // the user's address is needed as manager
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request { // definition of a type of variable, it's not an instance 
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests; // the struct type defined above
    address public manager; // the address of the manager so people can have access to it 
    uint public minimumContribution;
    mapping(address => bool) public approvers; // Use mapping instead of Arrays to store contributor of this Campaign
    uint public approversCount;
    
    // Modifier for the manager
    modifier restricted() {
        require(msg.sender == manager);
        _; // the function that has this modifier is placed here automatically
    }
    
    function Campaign(uint minimum, address creator) public {
        manager = creator; // global variable, it is always possible
        minimumContribution = minimum;
        
    }
    
    function contribute() public payable {  // payable is used so that people can send ether 
        require(msg.value > minimumContribution); // msg.value is the value in wei sent by people 
        approvers[msg.sender] = true; //address of the person calling this message
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted { // only manager should be able to call this 
        require(approvers[msg.sender]); // In mappings - we provide the key as address and a hashing code is run to return the boolean
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]); // Check if the sender has contributed it 
        require(!request.approvals[msg.sender]); // Checks if the person has not voted already
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2)); // Atleast half of the contributors said "yes"
        require(!request.complete);
        
        request.recipient.transfer(request.value); // the amount of money to be sent
        request.complete = true;
    }
    
    
}