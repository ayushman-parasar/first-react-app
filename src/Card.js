import React from "react";

// cont.style.display = "none";
class Card extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            username: null,
            id:null,
            avatar_url : null,
            url :null,
            followers: null,
            following: null 
        }
    }
    
    getUser(username){
       return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
    }
    
    async handleSubmit(event){
        event.preventDefault();
        var user = await this.getUser(this.refs.username.value);

        this.setState({username: user.login,
                      name: user.name,
                      id:user.id,
                      bio: user.bio,
                      avatar_url:user.avatar_url,
                      followers: user.followers,
                      following:user.following,
                      created: user.created_at.slice(0,10)
        })
            }
    
    render(){
        return (
            <>
            <header><h1 className = "top_text">Github Card</h1></header>
            <form onSubmit = {e => this.handleSubmit(e)}>
                     <input className="inputBox" ref = "username" type="text" placeholder="Enter username"></input>
                 </form>
            <section className="wrapper" >
                <div className="card">
                    <figure  className="card__image">
                    <img src={this.state.avatar_url} alt="Short description"/>
                    </figure>
                    <div className="card__header">
                        
                    </div>
                    <div className="card__body">
                    <h3 className="card__name">{this.state.username}</h3>
                    <p className="card__job">{this.state.name}</p>
                    <p className="card__bio">{this.state.bio}</p>
                    <p className="card__bio diff_col">Followers:{this.state.followers}</p>  
                    <p className="card__bio diff_col">Following:{this.state.following}</p>         
                

                    </div>
                    <div className="card__footer">
                <p className="card__date">Account Created At : {this.state.created}</p>
                    <p className=""></p>
                    </div>
                </div>
            
            
            </section>
       </> 
       )
    }
}

export default Card;