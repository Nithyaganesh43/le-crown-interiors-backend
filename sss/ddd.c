#include<stdio.h>
#include<semaphore.h>
#include<pthread.h>
#define MAX_TICKET 5
int available_tickets = MAX_TICKET;

sem_t ticket_lock;

void book_ticket(int user_id){ // user_id = 1001
    sem_wait(&ticket_lock); // 0(No. of tickets) (A15)
    if(available_tickets > 0){
        printf("User id %d booked the tickets", user_id);
        available_tickets--;

    }
    else if(ticket_lock > available_tickets){

    }
    sem_post(&ticket_lock);
}
int main(){
    pthread_t user[10];
    int user_id[10];
    sem_init(&ticket_lock, 0, 1);
    for(int i=0;i<10;i++){
        user_id[i] = i+1;
        pthread_create(&user[i], NULL, book_ticket, user_id[i]); 
    }
        // to activate the thread need join.
        pthread_join(user[i], NULL);
    }
    sem_destroy(&ticket_lock);
    return 0;
}