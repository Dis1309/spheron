import hashlib
 
def standardized_address(creator_address: str) -> str:
    # Strip the '0x' prefix if it exists and format the address to be 64 characters long
    handle = creator_address.removeprefix("0x") if creator_address.startswith("0x") else creator_address
    return f"0x{handle:0>64}"
 
def sha256_hex(creator_address: str, collection_name: str) -> str:
    # Process the creator address
    processed_address = standardized_address(creator_address)
    
    # Combine processed creator address and collection name
    combined_string = f"{creator_address}::{collection_name}"
    # Compute SHA256 hash and return as a hexadecimal string
    return standardized_address(hashlib.sha256(combined_string.encode()).hexdigest())
 
# Example usage
creator_address = "0x7bf84486bf9b0e0b96226927e6f3c1b5a35c96ef4d8300f699d8341ef50aa35b"
collection_name = "0x7bf84486bf9b0e0b96226927e6f3c1b5a35c96ef4d8300f699d8341ef50aa35b"
# Collection Id is `0xe6a7399d10406b993e25d8a3bf24842413ba8f1a08444dbfa5f1c31b09f0d16e`
print(sha256_hex(creator_address, collection_name))